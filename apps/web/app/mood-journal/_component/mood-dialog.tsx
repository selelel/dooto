"use client";
import { useState, useEffect } from "react";
import {
  Trash2,
  Edit2,
  Save,
  X,
  Heart,
  Calendar,
  Smile,
  Meh,
  Frown,
  Laugh,
  Sparkles,
  BookHeart,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MoodEntry {
  id: number;
  date: string;
  mood: "great" | "good" | "okay" | "sad" | "stressed";
  entry: string;
  gratitude?: string;
  tags?: string[];
}

interface MoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moodEntry: MoodEntry | null;
  mode: "view" | "edit" | "create";
  onSave?: (entry: Partial<MoodEntry>) => void;
  onDelete?: (entryId: number) => void;
}

const moodEmojis = {
  great: {
    icon: Laugh,
    label: "Great",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
  good: {
    icon: Smile,
    label: "Good",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  okay: {
    icon: Meh,
    label: "Okay",
    color: "text-accent-foreground",
    bg: "bg-accent/30",
    border: "border-accent/30",
  },
  sad: {
    icon: Frown,
    label: "Sad",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
  stressed: {
    icon: Frown,
    label: "Stressed",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
};

export function MoodDialog({
  open,
  onOpenChange,
  moodEntry,
  mode: initialMode,
  onSave,
  onDelete,
}: MoodDialogProps) {
  const [mode, setMode] = useState<"view" | "edit" | "create">(initialMode);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    mood: "good" as "great" | "good" | "okay" | "sad" | "stressed",
    entry: "",
    gratitude: "",
    tags: [] as string[],
  });

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (moodEntry && mode !== "create") {
      setFormData({
        mood: moodEntry.mood,
        entry: moodEntry.entry,
        gratitude: moodEntry.gratitude || "",
        tags: moodEntry.tags || [],
      });
    } else {
      setFormData({
        mood: "good",
        entry: "",
        gratitude: "",
        tags: [],
      });
    }
  }, [moodEntry, mode, open]);

  const handleSave = () => {
    if (formData.entry.trim()) {
      onSave?.(formData);
      onOpenChange(false);
      setMode(initialMode);
    }
  };

  const handleDelete = () => {
    if (moodEntry) {
      onDelete?.(moodEntry.id);
      onOpenChange(false);
      setShowDeleteConfirm(false);
    }
  };

  // Delete Confirmation State
  if (showDeleteConfirm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-destructive'>
              <Trash2 className='w-5 h-5' />
              Delete Journal Entry?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this journal entry? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className='p-4 rounded-lg bg-muted/50 border border-border'>
            <div className='flex items-center gap-3 mb-3'>
              {moodEntry &&
                (() => {
                  const MoodIcon = moodEmojis[moodEntry.mood].icon;
                  return (
                    <div
                      className={`p-2 rounded-lg ${moodEmojis[moodEntry.mood].bg}`}
                    >
                      <MoodIcon
                        className={`w-5 h-5 ${moodEmojis[moodEntry.mood].color}`}
                      />
                    </div>
                  );
                })()}
              <div>
                <p className='text-sm text-muted-foreground'>
                  {moodEntry?.date}
                </p>
                <Badge
                  className={moodEntry ? moodEmojis[moodEntry.mood].bg : ""}
                >
                  {moodEntry && moodEmojis[moodEntry.mood].label}
                </Badge>
              </div>
            </div>
            <p className='text-sm line-clamp-3'>{moodEntry?.entry}</p>
          </div>

          <DialogFooter className='gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleDelete}
              className='bg-destructive hover:bg-destructive/90'
            >
              <Trash2 className='w-4 h-4 mr-2' />
              Delete Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // View Mode
  if (mode === "view" && moodEntry) {
    const MoodIcon = moodEmojis[moodEntry.mood].icon;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <div className='flex items-start justify-between gap-4 mb-4'>
              <div className='flex items-start gap-3 flex-1'>
                <div
                  className={`p-3 rounded-xl ${moodEmojis[moodEntry.mood].bg} border ${moodEmojis[moodEntry.mood].border}`}
                >
                  <MoodIcon
                    className={`w-7 h-7 ${moodEmojis[moodEntry.mood].color}`}
                  />
                </div>
                <div className='flex-1'>
                  <DialogTitle className='text-xl mb-2'>
                    Feeling {moodEmojis[moodEntry.mood].label}
                  </DialogTitle>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Calendar className='w-4 h-4' />
                    <span>{moodEntry.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className='space-y-6'>
            {/* Mood Badge */}
            <div>
              <Badge
                className={`${moodEmojis[moodEntry.mood].bg} ${moodEmojis[moodEntry.mood].color} ${moodEmojis[moodEntry.mood].border} border`}
              >
                {moodEmojis[moodEntry.mood].label} Mood
              </Badge>
            </div>

            {/* Journal Entry */}
            <div className='p-4 rounded-lg bg-muted/50 border border-border'>
              <div className='flex items-center gap-2 mb-3'>
                <BookHeart className='w-4 h-4 text-muted-foreground' />
                <p className='text-sm font-medium'>Journal Entry</p>
              </div>
              <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                {moodEntry.entry}
              </p>
            </div>

            {/* Gratitude */}
            {moodEntry.gratitude && (
              <div className='p-4 rounded-lg bg-linear-to-br from-success/10 to-success/5 border border-success/20'>
                <div className='flex items-center gap-2 mb-3'>
                  <Heart className='w-5 h-5 text-success' />
                  <p className='text-sm font-medium'>Grateful For</p>
                </div>
                <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                  {moodEntry.gratitude}
                </p>
              </div>
            )}

            {/* Tags */}
            {moodEntry.tags && moodEntry.tags.length > 0 && (
              <div>
                <div className='flex items-center gap-2 mb-3'>
                  <Sparkles className='w-4 h-4 text-muted-foreground' />
                  <p className='text-sm font-medium'>Tags</p>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {moodEntry.tags.map((tag, index) => (
                    <Badge key={index} variant='outline' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className='gap-2 sm:gap-2'>
            <Button
              variant='outline'
              onClick={() => setMode("edit")}
              className='flex-1'
            >
              <Edit2 className='w-4 h-4 mr-2' />
              Edit Entry
            </Button>
            <Button
              variant='destructive'
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Edit/Create Mode
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "New Journal Entry" : "Edit Journal Entry"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Reflect on your day and capture your thoughts"
              : "Update your journal entry"}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Mood Selector */}
          <div className='space-y-3'>
            <Label>How are you feeling? *</Label>
            <div className='grid grid-cols-5 gap-2'>
              {(Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>).map(
                (mood) => {
                  const MoodIcon = moodEmojis[mood].icon;
                  return (
                    <button
                      key={mood}
                      onClick={() => setFormData({ ...formData, mood })}
                      className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.mood === mood
                          ? `${moodEmojis[mood].bg} border-current ${moodEmojis[mood].color} shadow-sm`
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <MoodIcon
                        className={`w-6 h-6 ${
                          formData.mood === mood
                            ? moodEmojis[mood].color
                            : "text-muted-foreground"
                        }`}
                      />
                      <p className='text-[10px] font-medium'>
                        {moodEmojis[mood].label}
                      </p>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Journal Entry */}
          <div className='space-y-2'>
            <Label htmlFor='mood-entry'>What's on your mind? *</Label>
            <Textarea
              id='mood-entry'
              placeholder="Write about your day, your thoughts, feelings, or anything you'd like to remember..."
              value={formData.entry}
              onChange={(e) =>
                setFormData({ ...formData, entry: e.target.value })
              }
              rows={5}
              className='resize-none'
            />
            <p className='text-xs text-muted-foreground'>
              {formData.entry.length} characters
            </p>
          </div>

          {/* Gratitude */}
          <div className='space-y-2'>
            <Label htmlFor='mood-gratitude' className='flex items-center gap-2'>
              <Heart className='w-4 h-4 text-success' />
              What are you grateful for? (Optional)
            </Label>
            <Textarea
              id='mood-gratitude'
              placeholder="List 1-3 things you're grateful for today..."
              value={formData.gratitude}
              onChange={(e) =>
                setFormData({ ...formData, gratitude: e.target.value })
              }
              rows={3}
              className='resize-none'
            />
          </div>

          {/* Quick Mood Indicator */}
          <div
            className={`p-4 rounded-lg ${moodEmojis[formData.mood].bg} border ${moodEmojis[formData.mood].border}`}
          >
            <div className='flex items-center gap-3'>
              {(() => {
                const MoodIcon = moodEmojis[formData.mood].icon;
                return (
                  <>
                    <MoodIcon
                      className={`w-6 h-6 ${moodEmojis[formData.mood].color}`}
                    />
                    <div>
                      <p className='text-sm font-medium'>
                        {mode === "create"
                          ? "You're feeling"
                          : "Mood updated to"}{" "}
                        {moodEmojis[formData.mood].label.toLowerCase()}
                      </p>
                      <p className='text-xs text-muted-foreground mt-1'>
                        {formData.entry.trim()
                          ? "Your thoughts are being captured"
                          : "Add your thoughts above"}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <DialogFooter className='gap-2'>
          {mode === "edit" && (
            <Button
              variant='outline'
              onClick={() => setMode("view")}
              className='mr-auto'
            >
              <X className='w-4 h-4 mr-2' />
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!formData.entry.trim()}
            className='bg-primary hover:bg-primary/90'
          >
            <Save className='w-4 h-4 mr-2' />
            {mode === "create" ? "Save Entry" : "Update Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
