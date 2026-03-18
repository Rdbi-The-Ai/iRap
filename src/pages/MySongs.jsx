import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Music, Folder, Plus, Trash2, Edit, Search, 
  FolderPlus, Palette 
} from 'lucide-react';

export default function MySongs() {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('all');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('purple');

  const { data: songs = [] } = useQuery({
    queryKey: ['songs'],
    queryFn: () => base44.entities.Song.list('-created_date')
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-created_date')
  });

  const createProjectMutation = useMutation({
    mutationFn: (data) => base44.entities.Project.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      setCreateProjectOpen(false);
      setNewProjectName('');
    }
  });

  const deleteSongMutation = useMutation({
    mutationFn: (id) => base44.entities.Song.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['songs'])
  });

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.lyrics?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject === 'all' || 
                          selectedProject === 'none' && !song.project_id ||
                          song.project_id === selectedProject;
    return matchesSearch && matchesProject;
  });

  const colorMap = {
    purple: 'from-[#C77DFF] to-[#9D4EDD]',
    magenta: 'from-[#FF3D9A] to-[#C1145D]',
    cyan: 'from-[#4DE8FF] to-[#00B4D8]',
    orange: 'from-[#FFB020] to-[#FF8500]',
    green: 'from-[#28D17C] to-[#00A86B]'
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#F4F1FF] mb-2">My Songs</h1>
              <p className="text-[rgba(244,241,255,0.72)]">Organize and manage your lyrical creations</p>
            </div>
            <Button
              onClick={() => setCreateProjectOpen(true)}
              className="gradient-primary gap-2"
            >
              <FolderPlus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgba(244,241,255,0.52)]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search songs..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedProject === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedProject('all')}
                size="sm"
                className={selectedProject === 'all' ? 'gradient-primary' : ''}
              >
                All Songs
              </Button>
              <Button
                variant={selectedProject === 'none' ? 'default' : 'outline'}
                onClick={() => setSelectedProject('none')}
                size="sm"
                className={selectedProject === 'none' ? 'gradient-primary' : ''}
              >
                No Project
              </Button>
              {projects.map(project => (
                <Button
                  key={project.id}
                  variant={selectedProject === project.id ? 'default' : 'outline'}
                  onClick={() => setSelectedProject(project.id)}
                  size="sm"
                  className={selectedProject === project.id ? 'gradient-primary' : ''}
                >
                  <Folder className="w-3 h-3 mr-2" />
                  {project.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Songs Grid */}
          {filteredSongs.length === 0 ? (
            <div className="glass-panel rounded-3xl p-16 text-center">
              <Music className="w-16 h-16 text-[rgba(244,241,255,0.32)] mx-auto mb-4" />
              <p className="text-[rgba(244,241,255,0.52)] text-lg">
                {searchQuery ? 'No songs found' : 'No songs yet. Start creating!'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSongs.map(song => {
                const project = projects.find(p => p.id === song.project_id);
                return (
                  <div
                    key={song.id}
                    className="glass-panel-elevated rounded-3xl p-6 hover:scale-105 transition-all group"
                  >
                    {project && (
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 bg-gradient-to-r ${colorMap[project.color] || colorMap.purple}`}>
                        <Folder className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white">{project.name}</span>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#F4F1FF] mb-2 line-clamp-1">
                          {song.title}
                        </h3>
                        <div className="flex gap-2 flex-wrap mb-3">
                          {song.mood && (
                            <span className="text-xs px-2 py-1 rounded-full glass-panel text-[rgba(244,241,255,0.72)]">
                              {song.mood}
                            </span>
                          )}
                          {song.style && (
                            <span className="text-xs px-2 py-1 rounded-full glass-panel text-[rgba(244,241,255,0.72)]">
                              {song.style}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSongMutation.mutate(song.id)}
                        className="text-[rgba(244,241,255,0.52)] hover:text-[#FF4D4D]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-[rgba(244,241,255,0.72)] text-sm line-clamp-4 whitespace-pre-line font-mono">
                      {song.lyrics}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                      <span className="text-xs text-[rgba(244,241,255,0.52)]">
                        {new Date(song.created_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Project Dialog */}
      <Dialog open={createProjectOpen} onOpenChange={setCreateProjectOpen}>
        <DialogContent className="glass-panel-elevated border-gradient">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#F4F1FF]">New Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-[rgba(244,241,255,0.72)]">Project Name</Label>
              <Input
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="My Diss Collection"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-[rgba(244,241,255,0.72)] mb-3 block">Color Theme</Label>
              <div className="flex gap-2">
                {['purple', 'magenta', 'cyan', 'orange', 'green'].map(color => (
                  <button
                    key={color}
                    onClick={() => setNewProjectColor(color)}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} ${
                      newProjectColor === color ? 'ring-2 ring-white scale-110' : ''
                    } transition-all`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setCreateProjectOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => createProjectMutation.mutate({ name: newProjectName, color: newProjectColor })}
                disabled={!newProjectName.trim()}
                className="flex-1 gradient-primary"
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}