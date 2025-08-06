import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// PlanCanvas component for D3-based visualizations with zoom controls
const PlanCanvas: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Initialize D3 zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10]) // Min and max zoom scale
      .on('zoom', (event) => {
        // Apply zoom transform to the SVG
        d3.select(svgRef.current!).select('g').attr('transform', event.transform);
      });

    // Store zoom reference for external control
    zoomRef.current = zoom;

    // Apply zoom to the SVG
    d3.select(svgRef.current).call(zoom);

    // TODO: Add D3 drawing logic here later
    // This is where the actual visualization elements will be added

  }, []);

  const handleZoomIn = () => {
    if (zoomRef.current && svgRef.current) {
      const currentTransform = d3.zoomTransform(svgRef.current);
      const newScale = currentTransform.k * 1.5;
      const newTransform = currentTransform.scale(newScale);
      d3.select(svgRef.current).transition().call(zoomRef.current.transform, newTransform);
    }
  };

  const handleZoomOut = () => {
    if (zoomRef.current && svgRef.current) {
      const currentTransform = d3.zoomTransform(svgRef.current);
      const newScale = currentTransform.k / 1.5;
      const newTransform = currentTransform.scale(newScale);
      d3.select(svgRef.current).transition().call(zoomRef.current.transform, newTransform);
    }
  };

  const handleZoomFit = () => {
    if (zoomRef.current && svgRef.current) {
      // Reset to identity transform (no zoom/pan)
      d3.select(svgRef.current).transition().call(zoomRef.current.transform, d3.zoomIdentity);
    }
  };

  return (
    <div className="flex gap-4 w-full">
      {/* D3 Canvas Container */}
      <div className="flex-1 border border-gray-300 rounded-lg p-4 bg-white">
        <svg
          ref={svgRef}
          width="100%"
          height="400"
          className="border border-gray-200 rounded"
        >
          {/* Main group that will be transformed by zoom */}
          <g>
            {/* TODO: Add D3 visualization elements here */}
            {/* This is where the actual drawing will be implemented */}
            
            {/* Placeholder text to show the canvas is working */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-gray-400 text-sm"
            >
              D3 Canvas - Visualization will be added here
            </text>
          </g>
        </svg>
      </div>

      {/* Zoom Controls */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          aria-label="Zoom in"
        >
          Zoom +
        </button>
        <button
          onClick={handleZoomOut}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          aria-label="Zoom out"
        >
          Zoom -
        </button>
        <button
          onClick={handleZoomFit}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium"
          aria-label="Zoom fit"
        >
          Zoom Fit
        </button>
      </div>
    </div>
  );
};

export default PlanCanvas; 