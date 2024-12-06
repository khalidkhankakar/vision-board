import { Camera, Color, Layer, Point, Side, XYHW } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToShortDate(dateString: string) {
  // Parse the ISO date string
  const date = new Date(dateString);

  // Get the components
  const options = {
    weekday: 'short', // Three-letter day (e.g., "Fri")
    day: '2-digit',   // Two-digit day of the month (e.g., "23")
    month: '2-digit', // Two-digit month (e.g., "02")
    year: 'numeric',  // Full year (e.g., "2024")
  };

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', options as Intl.DateTimeFormatOptions);

  // Custom format: `Fri 23, 02, 2024`
  return formattedDate.replace(/, /g, ', ');
}


const COLORS = [
  "#05ffee",
  "#ff052b",
  "#fbff00",
  "#d900ff",
  "#1808ff",
  "#ff0890",
]

export function connectionIdColor(id: number): string {
  return COLORS[id % COLORS.length]
}

export const pointerEventToCameraPointer = (e: React.PointerEvent, cam: Camera) => {
  return { x: Math.round(e.clientX) - cam.x, y: Math.round(e.clientY) - cam.y }
}

export const colorToCSS = (color: Color): string => {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
}

export const resizeBounds = (bounds: XYHW, cornor: Side, point: Point): XYHW => {

  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  }

  if ((cornor & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width)
    result.width = Math.abs(point.x + bounds.width - point.x)
  }

  if ((cornor & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x)
    result.width = Math.abs(point.x - point.x)
  }

  if ((cornor & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height)
    result.height = Math.abs(bounds.y + bounds.height - point.y)
  }

  if ((cornor & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y)
    result.height = Math.abs(point.y + bounds.y)
  }

  return result

}

export const findIntersectionlayerRectangle = (
  layerIds: Readonly<string[]>,
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point

) => {

  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  }

  const ids = []

  for (const layerId of layerIds) {
    const layer = layers.get(layerId)
    if (layer == null) continue;
    const { x, y, height, width } = layer;

    if (rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height) {
      ids.push(layerId)
    }

  }
  return ids
}