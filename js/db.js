/* ===== SUPABASE DATABASE MODULE ===== */
const SUPABASE_URL = 'https://vbjznpyvhhecxxbmizpc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZianpucHl2aGhlY3h4Ym1penBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTk2MzQsImV4cCI6MjA4NTUzNTYzNH0.gVXhfjf536X_NQgSfjh6AOa9aZ12ueN-gBrr4oZjlwQ';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const DB = {
    // Generate a short readable ID like "israel-to-babe-a3x9"
    generateId(senderName, valName) {
        const clean = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12);
        const rand = Math.random().toString(36).slice(2, 6);
        return `${clean(senderName)}-to-${clean(valName)}-${rand}`;
    },

    // Upload a photo to Supabase Storage, returns public URL
    async uploadPhoto(file, requestId, type) {
        if (!file) return null;
        try {
            const ext = file.name.split('.').pop() || 'jpg';
            const path = `${requestId}/${type}.${ext}`;
            const { data, error } = await supabase.storage
                .from('photos')
                .upload(path, file, {
                    cacheControl: '3600',
                    upsert: true
                });
            if (error) {
                console.error('Photo upload error:', error);
                return null;
            }
            // Get public URL
            const { data: urlData } = supabase.storage
                .from('photos')
                .getPublicUrl(path);
            return urlData.publicUrl;
        } catch (e) {
            console.error('Photo upload failed:', e);
            return null;
        }
    },

    // Create a new val request in the database
    async createRequest(data) {
        const { error } = await supabase
            .from('val_requests')
            .insert(data);
        if (error) {
            console.error('Create request error:', error);
            throw error;
        }
        return data.id;
    },

    // Fetch a val request by ID
    async getRequest(id) {
        const { data, error } = await supabase
            .from('val_requests')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Fetch request error:', error);
            return null;
        }
        return data;
    },

    // Mark the request as opened
    async markOpened(id) {
        await supabase
            .from('val_requests')
            .update({ opened_at: new Date().toISOString() })
            .eq('id', id)
            .is('opened_at', null); // only set once
    },

    // Record the YES response and number of No attempts
    async markResponded(id, noAttempts) {
        await supabase
            .from('val_requests')
            .update({
                responded_at: new Date().toISOString(),
                response: 'yes',
                no_attempts: noAttempts
            })
            .eq('id', id);
    },

    // Get real stats for the leaderboard
    async getStats() {
        try {
            // Count by gender
            const { count: menCount } = await supabase
                .from('val_requests')
                .select('*', { count: 'exact', head: true })
                .eq('gender', 'm2f');

            const { count: womenCount } = await supabase
                .from('val_requests')
                .select('*', { count: 'exact', head: true })
                .eq('gender', 'f2m');

            const { count: yesCount } = await supabase
                .from('val_requests')
                .select('*', { count: 'exact', head: true })
                .not('responded_at', 'is', null);

            const { count: noFailCount } = await supabase
                .from('val_requests')
                .select('*', { count: 'exact', head: true })
                .gt('no_attempts', 0);

            return {
                men: menCount || 0,
                women: womenCount || 0,
                yes: yesCount || 0,
                noFail: noFailCount || 0
            };
        } catch (e) {
            console.error('Stats fetch error:', e);
            return null;
        }
    }
};
