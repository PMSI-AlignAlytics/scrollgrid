/**
 * Attach a window resize listener that triggers a refresh.  Uses
 * addEventListener so callers can hook in their own listeners without
 * stomping on each other (the original code clobbered window.onresize).
 *
 * Stores a detach function on the instance so {@link Scrollgrid#destroy}
 * can clean up cleanly.
 */
export function setAutoResize(self) {
    const handler = () => self.refresh(true);
    window.addEventListener('resize', handler);
    self.detachResize = () => window.removeEventListener('resize', handler);
}
