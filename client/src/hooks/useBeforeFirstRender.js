import { useState, useEffect } from 'react'

export function useBeforeFirstRender(func) {
    const [hasRendered, setHasRendered] = useState(false)
    useEffect(() => setHasRendered(true), [hasRendered])
    if (!hasRendered) {
        func()
    }
}