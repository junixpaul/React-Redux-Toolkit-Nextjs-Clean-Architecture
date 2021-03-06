import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../store"

import { ItemServiceImpl } from "../../../domain/usecases/ItemService"
import { ItemRepositoryImpl } from "../../../data/repositories/ItemRepositoryImpl"
import { Item } from "../../../domain/entities/Item"
// Define a type for the slice state
interface CounterState {
    loading: boolean
    items: Array<Item>
}

// Define the initial state using that type
const initialState: CounterState = {
    loading: false,
    items: [],
}

export const fetchList = createAsyncThunk("itemList/fetchList", async () => {
    const itemRepo = new ItemRepositoryImpl()
    const itemService = new ItemServiceImpl(itemRepo)
    const items = await itemService.GetItems()
    console.log(items)
    return items
})
export const itemSlice = createSlice({
    name: "itemList",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchList.fulfilled, (state, action) => {
            return {
                ...state,
                items: action.payload,
                loading: false,
            }
        })
        builder.addCase(fetchList.pending, (state) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(fetchList.rejected, (state) => {
            return {
                ...state,
                loading: false,
            }
        })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const items = (state: RootState) => state.items.items

export default itemSlice.reducer