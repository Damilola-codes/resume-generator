export function formatDate(dateString: string){
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short'
    })
}