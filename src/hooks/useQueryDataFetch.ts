import { useQuery } from '@tanstack/react-query';
import {
  getTodoListQueryFns,
  getTodohistoryFns,
} from '../utils/queryFns/todoListQueryFns';
import { TodoData } from '../types/todolistType';

const useTodoListData = (selectedDate: string) => {
  return useQuery<TodoData[]>({
    queryKey: ['todolist', selectedDate],
    queryFn: () => getTodoListQueryFns(selectedDate),
    initialData:[],
  });
};

const useHistoryData = (moveMonth: string) => {
  return useQuery({
    queryKey: ['todoHistory', moveMonth],
    queryFn: () => getTodohistoryFns(moveMonth),
    initialData:[],
  });
};


export const useCombinedDataFetch = (
  selectedDate: string,
  moveMonth: string
) => {
  const {data: todoListData} = useTodoListData(selectedDate);
  const {data: historyData} = useHistoryData(moveMonth);
  return { todoListData, historyData };
};
