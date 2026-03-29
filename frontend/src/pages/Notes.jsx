import { useState, useEffect } from 'react';
import { notesAPI } from '../services/api';
import './Notes.css';

export function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getNotes();
      setNotes(response.data.data);
    } catch (err) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      if (editing) {
        // Update note
        const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        await notesAPI.updateNote(editing._id, {
          title: formData.title,
          content: formData.content,
          tags
        });
        setSuccess('Note updated successfully!');
        setEditing(null);
      } else {
        // Create note
        const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        await notesAPI.createNote({
          title: formData.title,
          content: formData.content,
          tags
        });
        setSuccess('Note created successfully!');
      }

      setFormData({ title: '', content: '', tags: '' });
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save note');
    }
  };

  const handleEdit = (note) => {
    setEditing(note);
    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', ')
    });
  };

  const handleCancel = () => {
    setEditing(null);
    setFormData({ title: '', content: '', tags: '' });
    setError('');
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await notesAPI.deleteNote(noteId);
      setSuccess('Note deleted successfully!');
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  return (
    <div className="notes-container">
      <header className="notes-header">
        <h1>📝 My Notes</h1>
      </header>

      <main className="notes-main">
        <div className="notes-grid">
          {/* Form Section */}
          <div className="notes-form-section">
            <div className="form-card">
              <h2>{editing ? '✏️ Edit Note' : '➕ Create New Note'}</h2>

              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter note title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter note content"
                    rows="8"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g., work, important, todo"
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary">
                    {editing ? 'Update Note' : 'Create Note'}
                  </button>
                  {editing && (
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Notes List Section */}
          <div className="notes-list-section">
            <div className="notes-list">
              {loading ? (
                <div className="loading">Loading notes...</div>
              ) : notes.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📚</span>
                  <p>No notes yet. Create one to get started!</p>
                </div>
              ) : (
                notes.map(note => (
                  <div key={note._id} className="note-card">
                    <div className="note-header">
                      <h3>{note.title}</h3>
                    </div>

                    <p className="note-content">{note.content}</p>

                    {note.tags.length > 0 && (
                      <div className="note-tags">
                        {note.tags.map(tag => (
                          <span key={tag} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="note-meta">
                      <small>
                        {new Date(note.createdAt).toLocaleDateString()}
                      </small>
                    </div>

                    <div className="note-actions">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleEdit(note)}
                        title="Edit note"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(note._id)}
                        title="Delete note"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
