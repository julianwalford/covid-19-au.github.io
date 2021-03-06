class LinePolyLayer {
    constructor(map, dataSource, uniqueId, color, fillSourceId) {
        this.map = map;
        this.dataSource = dataSource;
        this.uniqueId = uniqueId;
        this.color = color;
        this.fillSourceId = fillSourceId;

        this._addLinePoly();
    }

    getLinePolyId() {
        return this.uniqueId+'linepoly';
    }

    /*******************************************************************
     * Line poly
     *******************************************************************/

    _addLinePoly() {
        // Add the line outline
        const map = this.map;

        // Make it so that symbol/circle layers are given different priorities
        // This is a temporary fix to make ACT display in the correct priority -
        // see also LayerHeatMap.js for an explanation.
        var lastLineLayer;
        var layers = map.getStyle().layers;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'line') {
                lastLineLayer = layers[i].id;
            }
            else if (layers[i].type === 'fill') {
                lastLineLayer = null;
            }
        }

        var linePolyLayer = map.addLayer({
            id: this.getLinePolyId(),
            minzoom: 2,
            type: 'line',
            source: this.fillSourceId,
            paint: {
                'line-color': this.color || '#000',
                'line-opacity': 1,
                'line-width': 1,
            },
            filter: ['==', '$type', 'Polygon']
        }, lastLineLayer);

        return {
            linePolyLayer: linePolyLayer
        };
    }

    remove() {
        const map = this.map;
        map.removeLayer(this.getLinePolyId());
    }
}

export default LinePolyLayer;
