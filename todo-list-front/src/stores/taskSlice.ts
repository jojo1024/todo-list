import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITaskState {
    listTask: ITask[]
}

export interface ITask {
    idTask: number;
    libTask: string;
}

const initialState: ITaskState = {
    listTask: []
};

export const taskSlice: any = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        setListTask: (state, action: PayloadAction<ITask[]>) => {
            state.listTask = action.payload;
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            state.listTask = [action.payload, ...state.listTask];
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            const index = state.listTask.findIndex(item => item.idTask === action.payload.idTask)
            if (index > -1) {
                state.listTask.splice(index,1,{ ...action.payload })
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.listTask.filter(item => item.idTask !== action.payload);
        },
    },
});

export const {
    deleteTask,
    addTask,
    updateTask,
    setListTask
  } = taskSlice.actions;
  
  export default taskSlice.reducer;
  