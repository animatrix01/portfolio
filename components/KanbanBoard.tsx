"use client";

import { cn } from "../lib/utils";
import {
    closestCorners,
    defaultDropAnimationSideEffects,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    DropAnimation,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Clock,
    Filter,
    MessageSquare,
    MoreHorizontal,
    Paperclip,
    Plus,
    Search,
    Trash2,
    X
} from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";

// --- Inline UI Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "secondary" | "destructive", size?: "default" | "sm" | "lg" | "icon" }>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "default",
                        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground": variant === "outline",
                        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80": variant === "secondary",
                        "bg-red-500 text-white shadow-sm hover:bg-red-600": variant === "destructive",
                        "h-9 px-4 py-2": size === "default",
                        "h-8 rounded-md px-3 text-xs": size === "sm",
                        "h-10 rounded-md px-8": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

const Badge = ({ className, variant = "default", onClick, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "destructive" | "outline" }) => {
    return (
        <div className={cn(
            "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            {
                "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80": variant === "default",
                "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
                "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80": variant === "destructive",
                "text-foreground": variant === "outline",
            },
            className
        )} onClick={onClick} {...props} />
    )
}

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
                className
            )}
            {...props}
        />
    )
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
    ({ className, ...props }, ref) => (
        <img
            ref={ref}
            className={cn("aspect-square h-full w-full object-cover", className)}
            {...props}
        />
    )
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-muted",
                className
            )}
            {...props}
        />
    )
)
AvatarFallback.displayName = "AvatarFallback"


// --- Types ---

type Id = string | number;

type Column = {
    id: Id;
    title: string;
};

type Task = {
    id: Id;
    columnId: Id;
    content: string;
    priority: "low" | "medium" | "high";
    tags: string[];
    comments: number;
    attachments: number;
    dueDate?: string;
    description?: string; // Added description
    assignees: string[];
};

// --- Mock Data ---

const initialColumns: Column[] = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
];

const initialTasks: Task[] = [
    {
        id: "1",
        columnId: "todo",
        content: "Design new landing page",
        priority: "high",
        tags: ["Design", "Marketing"],
        comments: 3,
        attachments: 2,
        dueDate: "Tomorrow",
        description: "Create high-fidelity mockups for the new landing page including hero section and features.",
        assignees: ["https://github.com/shadcn.png", "https://github.com/shadcn.png"],
    },
    {
        id: "2",
        columnId: "todo",
        content: "Competitor analysis",
        priority: "medium",
        tags: ["Research"],
        comments: 1,
        attachments: 0,
        dueDate: "Next Week",
        description: "Analyze top 5 competitors and identify gaps in the market.",
        assignees: ["https://github.com/shadcn.png"],
    },
];

// --- Components ---

function TaskModal({
    isOpen,
    onClose,
    onSave,
    task,
    columnId,
    onDelete
}: {
    isOpen: boolean,
    onClose: () => void,
    onSave: (task: Partial<Task>) => void,
    task?: Task | null,
    columnId?: Id,
    onDelete?: (id: Id) => void
}) {
    if (!isOpen) return null;

    const [content, setContent] = useState(task?.content || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>(task?.tags || []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            content,
            description,
            priority,
            tags,
            columnId: task?.columnId || columnId || "todo",
        });
        onClose();
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {task ? "Edit Task" : "New Task"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <Input
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Task title..."
                            required
                            className="bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border-gray-200 dark:border-white/10"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <Textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Add details..."
                            className="bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border-gray-200 dark:border-white/10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value as any)}
                                className="w-full h-9 rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-gray-900 dark:text-white"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                            <Input
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Type & Enter..."
                                className="bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border-gray-200 dark:border-white/10"
                            />
                        </div>
                    </div>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-red-100 hover:text-red-600" onClick={() => removeTag(tag)}>
                                    {tag} ×
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        {task && onDelete && (
                            <Button type="button" variant="destructive" onClick={() => { onDelete(task.id); onClose(); }}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            {task ? "Save Changes" : "Create Task"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function KanbanBoard({ onNavigate }: { onNavigate?: (view: string) => void }) {
    // --- State & Persistence ---
    const [columns, setColumns] = useState<Column[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("kanban-columns");
            if (saved) return JSON.parse(saved);
        }
        return initialColumns;
    });

    const [tasks, setTasks] = useState<Task[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("kanban-tasks");
            if (saved) return JSON.parse(saved);
        }
        return initialTasks;
    });

    useEffect(() => {
        localStorage.setItem("kanban-columns", JSON.stringify(columns));
    }, [columns]);

    useEffect(() => {
        localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    }, [tasks]);

    // --- Interaction State ---
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [targetColumnId, setTargetColumnId] = useState<Id>("todo");

    // Set page title
    useEffect(() => {
        document.title = "Kanban | Portfolio";
        return () => {
            document.title = "Portfolio | Creative Developer";
        };
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3px movement required before drag starts
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const filteredTasks = useMemo(() => {
        if (!searchQuery) return tasks;
        return tasks.filter((task) =>
            task.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tasks, searchQuery]);

    // --- Actions ---

    const handleCreateTask = (taskData: Partial<Task>) => {
        const newTask: Task = {
            id: Date.now().toString(),
            columnId: taskData.columnId || "todo",
            content: taskData.content || "New Task",
            priority: taskData.priority || "medium",
            tags: taskData.tags || [],
            comments: 0,
            attachments: 0,
            description: taskData.description || "",
            assignees: [],
            ...taskData
        };
        setTasks([...tasks, newTask]);
    };

    const handleUpdateTask = (taskData: Partial<Task>) => {
        if (!editingTask) return;
        setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
    };

    const handleDeleteTask = (id: Id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const openForCreate = (columnId: Id = "todo") => {
        setEditingTask(null);
        setTargetColumnId(columnId);
        setIsModalOpen(true);
    };

    const openForEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    // --- DnD Handlers ---

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if (!isActiveTask) return;

        // Im dropping a Task over another Task
        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveColumn = active.data.current?.type === "Column";
        if (isActiveColumn) {
            setColumns((columns) => {
                const activeIndex = columns.findIndex((col) => col.id === activeId);
                const overIndex = columns.findIndex((col) => col.id === overId);
                return arrayMove(columns, activeIndex, overIndex);
            });
        }
    }

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.5",
                },
            },
        }),
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col gap-6 overflow-hidden bg-background p-6 pt-24">
            {/* Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={editingTask ? handleUpdateTask : handleCreateTask}
                task={editingTask}
                columnId={targetColumnId}
                onDelete={handleDeleteTask}
            />

            {/* Glassmorphism background blobs */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.035] blur-[140px]" />
                <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.025] blur-[120px]" />
                <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.02] blur-[150px]" />
            </div>

            {/* Back Button */}
            {onNavigate && (
                <Button
                    variant="ghost"
                    onClick={() => onNavigate('home')}
                    className="w-fit gap-2 -ml-2 text-muted-foreground hover:text-foreground mb-[-10px] z-20 text-black dark:text-white"
                >
                    ← Back to Portfolio
                </Button>
            )}

            {/* Header */}
            <div className="relative flex flex-col gap-4 rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground text-black dark:text-white">
                        Kanban Board
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base max-w-2xl text-black/60 dark:text-white/60">
                        Efficiently organize tasks, visualize your workflow, and manage projects with ease using this interactive board.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/40" />
                        <Input
                            placeholder="Search tasks..."
                            className="w-[200px] pl-9 bg-background/60 border-border/50 backdrop-blur-md focus:bg-background/80 focus:border-border/70 transition-all text-black dark:text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-background/60 border-border/50 backdrop-blur-md hover:bg-background/80 text-black dark:text-white"
                    >
                        <Filter className="h-4 w-4 text-foreground/70" />
                    </Button>
                    <Button onClick={() => openForCreate()} className="gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-primary/20">
                        <Plus className="h-4 w-4" />
                        New Task
                    </Button>
                </div>
            </div>

            {/* Board */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="flex h-full gap-6 overflow-x-auto pb-4">
                    <SortableContext
                        items={columnsId}
                        strategy={horizontalListSortingStrategy}
                    >
                        {columns.map((col) => (
                            <BoardColumn
                                key={col.id}
                                column={col}
                                tasks={filteredTasks.filter((task) => task.columnId === col.id)}
                                onAddTask={() => openForCreate(col.id)}
                                onEditTask={openForEdit}
                            />
                        ))}
                    </SortableContext>
                </div>

                {/* Drag Overlay */}
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeColumn && (
                        <BoardColumn
                            column={activeColumn}
                            tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                            isOverlay
                        />
                    )}
                    {activeTask && <TaskCard task={activeTask} isOverlay />}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

interface BoardColumnProps {
    column: Column;
    tasks: Task[];
    isOverlay?: boolean;
    onAddTask?: () => void;
    onEditTask?: (task: Task) => void;
}

function BoardColumn({ column, tasks, isOverlay, onAddTask, onEditTask }: BoardColumnProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group/column relative flex h-full w-[350px] min-w-[350px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-lg pb-4",
                isDragging && "opacity-50",
                isOverlay &&
                "rotate-2 scale-105 shadow-2xl cursor-grabbing bg-background/70"
            )}
        >
            {/* Gradient overlay for column */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/column:opacity-100 pointer-events-none" />

            {/* Column Header */}
            <div
                {...attributes}
                {...listeners}
                className="relative z-10 flex items-center justify-between border-b border-border/30 bg-background/30 p-4 backdrop-blur-sm cursor-grab active:cursor-grabbing"
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm shadow-primary/20 backdrop-blur-sm">
                        {tasks.length}
                    </div>
                    <h3 className="font-semibold text-foreground text-black dark:text-white">{column.title}</h3>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-foreground/40 hover:text-foreground hover:bg-background/50 text-black dark:text-white"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Column Content */}
            <div className="relative z-10 flex flex-1 flex-col gap-3 p-3 min-h-[100px]">
                <SortableContext
                    items={tasksIds}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onClick={() => onEditTask?.(task)} />
                    ))}
                </SortableContext>
                <Button
                    variant="ghost"
                    onClick={onAddTask}
                    className="w-full justify-start gap-2 border border-dashed border-border/30 text-foreground/60 hover:text-foreground hover:bg-background/60 hover:border-border/50 backdrop-blur-sm text-gray-500"
                >
                    <Plus className="h-4 w-4" />
                    Add Task
                </Button>
            </div>
        </div>
    );
}

interface TaskCardProps {
    task: Task;
    isOverlay?: boolean;
    onClick?: () => void;
}

function TaskCard({ task, isOverlay, onClick }: TaskCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const priorityColors = {
        low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        medium:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        high: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className={cn(
                "group relative flex cursor-grab flex-col gap-3 overflow-hidden rounded-xl border border-border/40 bg-white/40 dark:bg-black/40 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-border/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-black/60 hover:-translate-y-1 active:cursor-grabbing hover:scale-[1.02]",
                isDragging && "opacity-30",
                isOverlay &&
                "rotate-2 scale-105 shadow-2xl cursor-grabbing opacity-100 bg-white/90 dark:bg-black/90 backdrop-blur-xl z-50 text-black dark:text-white ring-1 ring-border"
            )}
        >
            {/* Gradient overlay for card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

            {/* Header / Tags */}
            <div className="relative z-10 flex items-start justify-between">
                <div className="flex flex-wrap gap-1.5">
                    <Badge
                        variant="outline"
                        className={cn(
                            "border px-1.5 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur-sm",
                            priorityColors[task.priority]
                        )}
                    >
                        {task.priority}
                    </Badge>
                    {task.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gray-200/50 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 text-[10px] backdrop-blur-sm border-none"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 text-black dark:text-white"
                >
                    <MoreHorizontal className="h-3 w-3" />
                </Button>
            </div>

            {/* Content */}
            <p className="relative z-10 text-sm font-medium text-black dark:text-white leading-relaxed">
                {task.content}
            </p>

            {/* Description (Truncated) */}
            {task.description && (
                <p className="relative z-10 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between pt-1">
                <div className="flex items-center gap-3 text-xs text-black/50 dark:text-white/50">
                    {task.dueDate && (
                        <div
                            className={cn(
                                "flex items-center gap-1",
                                task.priority === "high" && "text-red-500/80"
                            )}
                        >
                            <Clock className="h-3 w-3" />
                            <span>{task.dueDate}</span>
                        </div>
                    )}
                    {(task.comments > 0 || task.attachments > 0) && (
                        <div className="flex items-center gap-2">
                            {task.comments > 0 && (
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    <span>{task.comments}</span>
                                </div>
                            )}
                            {task.attachments > 0 && (
                                <div className="flex items-center gap-1">
                                    <Paperclip className="h-3 w-3" />
                                    <span>{task.attachments}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Assignees */}
                {task.assignees.length > 0 && (
                    <div className="flex -space-x-2">
                        {task.assignees.map((avatar, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="text-[8px] bg-blue-500/10 text-blue-500">
                                    U{i + 1}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
