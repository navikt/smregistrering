import {useEffect} from "react";

function useWarnUnsavedPopup (disabled: boolean) {
    useEffect(() => {
        const handleBeforeUnload = (e: Event) => {
            if (!disabled) {
                e.preventDefault()
                // @ts-expect-error setter returnValue til tom streng fordi https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
                e.returnValue = '';
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [disabled])
}
export default useWarnUnsavedPopup;