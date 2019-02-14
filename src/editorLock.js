// teaserLock.js (server-side)

let editorLocks = [];

export const DISCONNECT = 'DISCONNECT';
export const EDITOR_LOCK_ENTER = 'EDITOR_LOCK_ENTER';
export const EDITOR_LOCK_LEAVE = 'EDITOR_LOCK_LEAVE';
export const EDITOR_LOCK_LIST = 'EDITOR_LOCK_LIST';

// Handler called to broadcast when a change occurs in the lock list
// Useful for UI changes (enable / disable buttons...)
export const emiteditorLocksChange = (socket) => {
    socket.emit(EDITOR_LOCK_LIST, editorLocks);
};

// Handler called when a client attempts to lock a resource
// => Client passes the wanted "teaserId" to lock and a callback named "notifyLocked" as argument
// => Handler calls "notifyLocked" back with the lock information (already locked or not)
// => Handler adds the lock to the lock list if needed, and broadcasts lock change
export const onTeaserLockEnter = (socket, clientId) => ({ teaserId }, notifyLocked) => {
    const isTeaserLocked = Boolean(
        editorLocks.find(lt => lt.teaserId === teaserId),
    );

    notifyLocked(isTeaserLocked);

    if (!isTeaserLocked) {
        editorLocks.push({ clientId, teaserId });
        emiteditorLocksChange(socket);
    }
};

// Handler called when a client leaves a resource
// => Client passes the "teaserId" to unlock
// => Handler removes the lock from this teaserId for this particular "clientId" (remind "mutex")
// => Handler broadcasts lock change if the teaser lock list has changed
export const onTeaserLockLeave = (socket, clientId) => ({ teaserId }) => {
    const initialLength = editorLocks.length;

    editorLocks = editorLocks.filter(lt => !(
        lt.teaserId === teaserId && lt.clientId === clientId
    ));

    if (editorLocks.length !== initialLength) {
        emiteditorLocksChange(socket);
    }
};

// Handler called when a client socket connection is broken (or when browser tab is closed)
// => Handler removes locks from the clientId (unique id (per tab) corresponding to socket connection)
// => Handler broadcasts lock change if the teaser lock list has changed
export const onDisconnect = (socket, clientId) => () => {
    const initialLength = editorLocks.length;

    editorLocks = editorLocks.filter(lt => !(
        lt.clientId === clientId
    ));

    if (editorLocks.length !== initialLength) {
        emiteditorLocksChange(socket);
    }
};

// This function is responsible for the websocket event registration on all lock commands
// EDITOR_LOCK_ENTER => P (Claim / Decrease)
// EDITOR_LOCK_LEAVE & DISCONNECT => V (Release / Increase)
export const teaserSocketLockHandler = (socket) => {
    socket.on('connection', (client) => {
        client.on(EDITOR_LOCK_ENTER, onTeaserLockEnter(socket, client.id));
        client.on(EDITOR_LOCK_LEAVE, onTeaserLockLeave(socket, client.id));
        client.on(DISCONNECT, onDisconnect(socket, client.id));
    });

    return socket;
};

export default editorSocketLockHandler;