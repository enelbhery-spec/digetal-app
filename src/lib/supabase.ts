import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://addlrxwxjquowcmkyyqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGxyeHd4anF1b3djbWt5eXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODg5MTAsImV4cCI6MjA4Njc2NDkxMH0.Ba5lUtyfN1SUye1kZ-tmOKrs3fFxA993YXSqVOuR4aA'
);