export type RouteChild = {
    link: string,
    name: string,
}

export type RouteLinks = {
    name: string,
    link?: string,
    childs?: RouteChild[], 
    row?: boolean,
}[]