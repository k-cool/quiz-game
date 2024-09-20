import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuid } from "uuid";

export type Player = {
  id: string;
  name: string;
  score: number;
};

type ScoreStore = {
  data: {
    players: Player[];
    didSetting: boolean;
  };

  actions: {
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    setDidSetting: (didSetting: boolean) => void;
    setScore: (id: string, score: number) => void;
    reset: () => void;
  };
};

const useScoreStore = create<ScoreStore>()(
  immer((set) => ({
    data: {
      players: [],
      didSetting: false,
    },

    actions: {
      addPlayer: (name: string) => {
        set((state) => {
          state.data.players.push({
            id: uuid(),
            name,
            score: 0,
          });
        });
      },

      removePlayer: (id: string) => {
        set((state) => {
          state.data.players = state.data.players.filter(
            (player) => player.id !== id
          );
        });
      },

      setDidSetting: (didSetting: boolean) => {
        set((state) => {
          state.data.didSetting = didSetting;
        });
      },

      setScore: (id: string, score: number) => {
        set((state) => {
          const target = state.data.players.find((player) => player.id === id);
          if (!target) return;

          target.score = score;
        });
      },

      reset: () => {
        set((state) => {
          state.data = {
            players: [],
            didSetting: true,
          };
        });
      },
    },
  }))
);

export default useScoreStore;
