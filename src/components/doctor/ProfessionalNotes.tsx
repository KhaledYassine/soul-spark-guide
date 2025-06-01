import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Save } from 'lucide-react';

interface SessionNote {
  id: string;
  date: Date;
  title: string;
  content: string;
  tags: string[];
}

const ProfessionalNotes: React.FC = () => {
  const [notes, setNotes] = useState<SessionNote[]>([
    {
      id: '1',
      date: new Date('2024-01-05'),
      title: 'CBT Session - Anxiety Management',
      content: 'Patient showed improvement in anxiety levels. Practiced breathing exercises and discussed coping strategies.',
      tags: ['CBT', 'Anxiety', 'Progress']
    }
  ]);
  
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) return;
    
    const note: SessionNote = {
      id: Date.now().toString(),
      date: new Date(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', tags: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-purple-500" />
          Professional Session Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Note */}
        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
          <h4 className="font-medium text-blue-800">Add Session Note</h4>
          <Input
            placeholder="Session title..."
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
          />
          <Textarea
            placeholder="Session notes and observations..."
            value={newNote.content}
            onChange={(e) => setNewNote({...newNote, content: e.target.value})}
            rows={4}
          />
          <Input
            placeholder="Tags (comma separated)"
            value={newNote.tags}
            onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
          />
          <Button onClick={handleSaveNote} size="sm">
            <Save className="h-3 w-3 mr-1" />
            Save Note
          </Button>
        </div>

        {/* Existing Notes */}
        <div className="space-y-3">
          <h4 className="font-medium">Recent Notes</h4>
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{note.title}</h5>
                <span className="text-xs text-gray-500">
                  {note.date.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{note.content}</p>
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalNotes;
