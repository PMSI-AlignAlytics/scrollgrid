export function populatePanel(self) {
    const svg = self.elements.container.append('svg');
    const transform = svg.append('g');
    const content = transform.append('g');
    return { svg, transform, content };
}
