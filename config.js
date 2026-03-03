Config = {}

Config.StartCash = 1000
Config.NewPlayerCost = 250
Config.DefaultCardCount = 2

Config.Players = [
    { income: 45, speed: 5, color: '#c2c2c2' },
    { income: 68, speed: 6.5, upgradeCost: 300, color: '#758887' },
    { income: 97, speed: 7.5, upgradeCost: 500, color: '#5bd6d0' },
    { income: 140, speed: 10, upgradeCost: 1550, color: '#1356b9' },
    { income: 230, speed: 12, upgradeCost: 3000, color: '#0de290' },
    { income: 315, speed: 14, upgradeCost: 7000, color: '#0ee70e' },
    { income: 465, speed: 16, upgradeCost: 9500, color: '#cde20d' },
    { income: 610, speed: 19, upgradeCost: 15000, color: '#8d17b1' },
    { income: 788, speed: 22, upgradeCost: 22500, color: '#e920c7' },
    { income: 980, speed: 25, upgradeCost: 30000, color: '#e2740d' },
    { income: 1150, speed: 27, upgradeCost: 75000, color: '#ff0000' },
    { income: 1450, speed: 30, upgradeCost: 250000, color: '#800f0f' },
    { income: 1780, speed: 35, upgradeCost: 1000000, color: '#281b4b' },
    { income: 2500, speed: 45, upgradeCost: 5000000, color: '#ca9729' },
]

// types:
// card-count
// cash-multiplier
// speed

Config.Upgrades = [
    { type: 'card-count', value: 1, cost: { cash: 500, gems: 1 } },
    { type: 'speed', value: 1.1, cost: { cash: 900, gems: 3 } },
    { type: 'cash-multiplier', value: 1.1, cost: { cash: 1300, gems: 3 } },
    { type: 'card-count', value: 2, cost: { cash: 2150, gems: 1 } },
    { type: 'speed', value: 1.2, cost: { cash: 3000, gems: 3 } },
    { type: 'card-count', value: 2, cost: { cash: 4150, gems: 3 } },
    { type: 'cash-multiplier', value: 1.15, cost: { cash: 5200, gems: 3 } },
    { type: 'speed', value: 1.3, cost: { cash: 6300, gems: 6 } },
    { type: 'card-count', value: 2, cost: { cash: 7400, gems: 3 } },
    { type: 'speed', value: 1.45, cost: { cash: 8800, gems: 4 } },
    { type: 'card-count', value: 3, cost: { cash: 9950, gems: 3 } },
    { type: 'cash-multiplier', value: 1.35, cost: { cash: 11500, gems: 4 } },
    { type: 'speed', value: 1.5, cost: { cash: 13300, gems: 3 } },
    { type: 'card-count', value: 2, cost: { cash: 15500, gems: 4 } },
    { type: 'card-count', value: 1, cost: { cash: 19500, gems: 3 } },
    { type: 'cash-multiplier', value: 1.45, cost: { cash: 22500, gems: 6 } },
    { type: 'card-count', value: 2, cost: { cash: 25400, gems: 4 } },
    { type: 'speed', value: 1.65, cost: { cash: 27000, gems: 7 } },
    { type: 'cash-multiplier', value: 1.6, cost: { cash: 29000, gems: 8 } },
    { type: 'card-count', value: 3, cost: { cash: 32000, gems: 5 } },
    { type: 'card-count', value: 2, cost: { cash: 36000, gems: 5 } },
    { type: 'cash-multiplier', value: 1.8, cost: { cash: 40000, gems: 4 } },
    { type: 'speed', value: 1.8, cost: { cash: 45000, gems: 5 } },
    { type: 'card-count', value: 2, cost: { cash: 49000, gems: 5 } },
    { type: 'card-count', value: 3, cost: { cash: 55000, gems: 8 } },
    { type: 'speed', value: 2.0, cost: { cash: 60000, gems: 6 } },
    { type: 'cash-multiplier', value: 1.95, cost: { cash: 70000, gems: 5 } },
    { type: 'card-count', value: 1, cost: { cash: 75000, gems: 6 } },
    { type: 'card-count', value: 2, cost: { cash: 85000, gems: 5 } },
    { type: 'card-count', value: 3, cost: { cash: 95000, gems: 8 } },
    { type: 'speed', value: 2.3, cost: { cash: 105000, gems: 6 } },
    { type: 'card-count', value: 1, cost: { cash: 120000, gems: 8 } },
    { type: 'cash-multiplier', value: 2.25, cost: { cash: 150000, gems: 10 } },
    { type: 'speed', value: 2.5, cost: { cash: 180000, gems: 11 } },
    { type: 'card-count', value: 2, cost: { cash: 200000, gems: 12 } },
    { type: 'card-count', value: 2, cost: { cash: 250000, gems: 12 } },
    { type: 'cash-multiplier', value: 2.5, cost: { cash: 500000, gems: 10 } },
    { type: 'speed', value: 2.85, cost: { cash: 730000, gems: 10 } },
    { type: 'card-count', value: 5, cost: { cash: 1000000, gems: 10 } },
    { type: 'cash-multiplier', value: 2.95, cost: { cash: 1250000, gems: 20 } },
    { type: 'speed', value: 3.4, cost: { cash: 1500000, gems: 15 } },
    { type: 'card-count', value: 3, cost: { cash: 2000000, gems: 20 } },
    { type: 'cash-multiplier', value: 3.25, cost: { cash: 2500000, gems: 30 } },
    { type: 'speed', value: 3.9, cost: { cash: 3000000, gems: 20 } },
    { type: 'card-count', value: 3, cost: { cash: 3500000, gems: 25 } },
    { type: 'speed', value: 4.5, cost: { cash: 4000000, gems: 25 } },
    { type: 'cash-multiplier', value: 3.85, cost: { cash: 5000000, gems: 30 } },
]