import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useContactSubmissions() {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitContact = async (data: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }) => {
        setSubmitting(true);
        setError(null);

        const { error: err } = await supabase
            .from('contact_submissions')
            .insert({
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
            });

        setSubmitting(false);

        if (err) {
            setError('Failed to submit your message. Please try again.');
            return false;
        }

        setSubmitted(true);
        return true;
    };

    const reset = () => {
        setSubmitted(false);
        setError(null);
    };

    return { submitContact, submitting, submitted, error, reset };
}
