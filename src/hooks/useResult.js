import { useState } from "react";

export default (players) => {
    const winner = () => {
        const winner = players.reduce(function(prev, current) {
            return (prev.score < current.score) ? prev : current
        })
        return winner.name;
    }
    return [winner()];
};
