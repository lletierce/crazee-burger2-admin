export function getUsernameFromEmail(email: string | null | undefined): string {
    if (!email) {
        throw new Error('Email invalide');
    }

    if (!email.includes('@')) {
        throw new Error('Email invalide');
    }
    return email.split('@')[0];
}


export function slugify(str: string) {
  return str
    .normalize("NFD")                  // Décompose les accents
    .replace(/[\u0300-\u036f]/g, "")   // Supprime les accents
    .toLowerCase()                     // Met en minuscules
    .trim()                            // Enlève les espaces début/fin
    .replace(/[/]/g, "-")              // Firestore : empêche les documents imbriqués accidentels
    .replace(/[^a-z0-9\s-]/g, "")      // Supprime caractères spéciaux
    .replace(/\s+/g, "-")              // Remplace espaces par tirets
    .replace(/-+/g, "-");              // Supprime les doubles tirets
}