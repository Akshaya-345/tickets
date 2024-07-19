import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

const initialState = {
  tickets: [],
  status: 'idle',
  error: null,
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const response = await api.get('/tickets');
  return response.data;
});

export const addTicket = createAsyncThunk('tickets/addTicket', async (newTicket) => {
    const response = await api.post('/tickets', newTicket);
    return response.data;
  });     

export const updateTicket = createAsyncThunk('tickets/updateTicket', async (updatedTicket) => {
  const { id, ...ticketData } = updatedTicket;
  const response = await api.put(`/tickets/${id}`, ticketData);
  return response.data;
});

export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async (ticketId) => {
  await api.delete(`/tickets/${ticketId}`);
  return ticketId;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload);
      });
  },
});

export default ticketsSlice.reducer;