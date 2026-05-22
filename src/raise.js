export function raise(self, err) {
    const log = self.reporter ?? console;
    if (log?.error) {
        log.error(err);
    } else {
        throw new Error(err);
    }
}
