import Sortable from 'sortablejs'

export default function dragAndDrop() {
    const widgetContainer = document.querySelector('#widget-container')

    new Sortable(widgetContainer, {
        animation: 150,
        onStart: (event) => console.log(event),
        onEnd: (event) => console.log(event)
    })
}