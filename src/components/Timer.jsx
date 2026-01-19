/**
 * Timer Component
 * Displays elapsed game time with premium styling
 */

import { formatTime } from '../utils/gameUtils';

export function Timer({ seconds, gameStatus }) {
    return (
        <div className="timer-display flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <span>{formatTime(seconds)}</span>
            {gameStatus === 'idle' && (
                <span className="text-sm text-gray-500 ml-2">(Click to start)</span>
            )}
        </div>
    );
}

export default Timer;
