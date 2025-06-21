export function getUsernameFromEmail(email: string | null | undefined): string {
    if (!email) {
        throw new Error('Email invalide');
    }

    if (!email.includes('@')) {
        throw new Error('Email invalide');
    }
    return email.split('@')[0];
}