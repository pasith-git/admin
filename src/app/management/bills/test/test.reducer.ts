import { createReducer, createSelector, on } from '@ngrx/store';
import * as book from './test.action';
const books = {
    name: ''
}
export const bookReducer = createReducer(books, on(book.readBook, state => ({ ...state, name: 'test' })));

export type Book = {
    name: null | string,
    size: number
}
const selector1 = (state: Book) => state.name;
const selector2 = (state: Book) => state.size;

export const stateSelector = () => createSelector(selector1, selector2, (name: string | null, size: number) => {
    return name + " " + size;
});