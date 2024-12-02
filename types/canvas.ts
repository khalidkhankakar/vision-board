export type Camera = {
    x: number
    y: number
}

export type Color ={
    r: number
    g: number
    b: number
}

export type Corner = {
    x: number
    y: number
}
export type Point = {
    x: number
    y: number
}
export type XYHW = {
    x: number
    y: number
    width: number
    height: number
}

export enum Side {
    Top =1,
    Bottom =2,
    Left=4,
    Right=8
}

export enum LayerType {
    Rectangle,
    Ellipse,
    Text,
    Path,
    Note
}
export type Layer = RectangleLayer | EllipseLayer | TextLayer | PathLayer | NoteLayer

export type RectangleLayer = {
    type: LayerType.Rectangle
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?:string
}
export type EllipseLayer = {
    type: LayerType.Ellipse
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?:string
}
export type PathLayer = {
    type: LayerType.Path
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?:string
    points:number[][]
}
export type TextLayer = {
    type: LayerType.Text
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?:string
}
export type NoteLayer = {
    type: LayerType.Note
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?:string
}


export type CanvasState = | {
    mode: CanvasMode.None
}| {
    mode: CanvasMode.Pressing
    origin: Point
}| {
    mode: CanvasMode.SelectionNet
    origin: Point
    current?: Point
}| {
    mode: CanvasMode.Inserting
    layerType: LayerType.Ellipse | LayerType.Rectangle| LayerType.Note | LayerType.Text
}| {
    mode: CanvasMode.Translating
    current: Point
}| {
    mode: CanvasMode.Resizing
    initialBounds: XYHW,
    current: Side
}| {
    mode: CanvasMode.Pencil
}

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Inserting,
    Translating,
    Resizing,
    Pencil
}