"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteUser, exportAllData } from "@/modules/user/actions";
import { Download } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

export default function DataPrivacySection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const confirmationPhrase = "are you sure you want to delete this account uwu";

  const handleDeleteUser = () => {
    deleteUser();
    setDialogOpen(false);
    setConfirmationText("");
  };

  const handleExportAllData = () => {
    exportAllData();
  };

  return (
    <>
      <Card className='mb-6 shadow-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Download className='w-5 h-5' />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='p-4 rounded-lg border border-border'>
            <p className='font-medium mb-2'>Export Your Data</p>
            <p className='text-sm text-muted-foreground mb-4'>
              Download all your tasks, habits, and journal entries
            </p>
            <Button onClick={handleExportAllData} variant='outline'>
              Export Data
            </Button>
          </div>

          <div className='p-4 rounded-lg border border-destructive/50 bg-destructive/5'>
            <p className='font-medium mb-2 text-destructive'>Delete Account</p>
            <p className='text-sm text-muted-foreground mb-4'>
              Permanently delete your account and all associated data
            </p>
            <Button onClick={() => setDialogOpen(true)} variant='destructive'>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogDescription>
              This action is <strong>irreversible</strong>. Please type the
              exact phrase below to confirm your account deletion.
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4'>
            <p className='mb-2 text-sm'>
              Type:{" "}
              <code className='bg-gray-100 px-1 rounded'>
                {confirmationPhrase}
              </code>
            </p>
            <Input
              autoFocus
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder='Type confirmation phrase here'
            />
          </div>

          <DialogFooter className='mt-6 flex gap-2'>
            <Button variant='outline' onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              disabled={confirmationText !== confirmationPhrase}
              onClick={handleDeleteUser}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
