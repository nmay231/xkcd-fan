/** @format */

export const fetchComic = async (id = '') => {
    try {
        let raw = await fetch(`/api/comic/${id}`, {
            dataType: 'json',
        })
        return await raw.json()
    } catch (err) {
        alert('Failed to retrieve comic data')
        return {}
    }
}
