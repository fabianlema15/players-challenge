class Variables {
    constructor() {
        this.Players = [];
        this.TotalAllPlayers = 0;
        this.CurrentPage = 1;
        this.NumberResults = 0;
        this.TotalPages = 0;
    }
    
    getPlayers = () => {
        return this.Players
    }

    setPlayers = (players) => {
        this.Players = [...players]
    }

    editPlayer = (id, player) => {
        const indexPlayer = this.Players.findIndex(player => player.id === id)
        this.Players[indexPlayer] = player
    }

    getTotalAllPlayers = () => {
        return this.TotalAllPlayers
    }

    setTotalAllPlayers = (totalAllPlayers) => {
        this.TotalAllPlayers = totalAllPlayers
    }

    addTotalAllPlayers = () => {
        this.TotalAllPlayers++
    }

    reduceTotalAllPlayers = () => {
        this.TotalAllPlayers--
    }

    getCurrentPage = () => {
        return this.CurrentPage
    }

    setCurrentPage = (currentPage) => {
        this.CurrentPage = currentPage
    }

    addCurrentPage = () => {
        this.CurrentPage++
    }

    reduceCurrentPage = () => {
        this.CurrentPage--
    }

    getNumberResults = () => {
        return this.NumberResults
    }

    setNumberResults = (numberResults) => {
        this.NumberResults = numberResults
    }

    getTotalPages = () => {
        return Math.floor(this.TotalAllPlayers / this.NumberResults) + (this.TotalAllPlayers % this.NumberResults === 0 ? 0: 1)
    }
}