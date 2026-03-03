let players = []

$(function () {
    let maxPlayers = Config.DefaultCardCount
    let cashMultiplier = 1
    let purchasedUpgrades = []
    let cash = Config.StartCash
    let gems = 0
    let speedMultiplier = 1

    $('.income').text(`INCOME: x${cashMultiplier} | SPEED: x${speedMultiplier}`)

    currentPlayerCost = Config.NewPlayerCost

    $('#cash').text(cash)
    $('#gems').text(gems);
    $('.players').html(``)

    loadGame()
    renderUpgrades()

    updatePlayersCount()

    function OpenConfirm(callback) {
        $('.confirmmenu').css('display', 'flex')

        $('.confirm-btn.confirm').off('click').on('click', function () {
            if (callback) {
                $('.confirmmenu').hide()
                callback(true)
            }
        })

        $('.confirm-btn.cancel').off('click').on('click', function () {
            $('.confirmmenu').hide()
            if (callback) callback(false)
        })
    }

    $('.new-player').on('click', function () {
        if (cash < currentPlayerCost) return
        if (players.length >= maxPlayers) return
        cash -= currentPlayerCost
        updateCash()

        const newPlayer = {
            level: 1,
            configIndex: 0,
            element: null,
            interval: null
        };

        const config = Config.Players[0]
        const $newPlayer = $(`
    <div class="player">
        <div class="progress"></div>
        <div class="player-level">1</div>
        <div class="player-upgrade-cost"></div>
    </div>
`)

        newPlayer.element = $newPlayer;
        $('.players').append($newPlayer);
        players.push(newPlayer);

        applyPlayerStyle(newPlayer);

        startIncome(newPlayer);
        setupUpgrade(newPlayer);

        currentPlayerCost = Math.ceil(currentPlayerCost * 1.2)
        $('.new-player').text(`NEW PLAYER ($${currentPlayerCost})`)
        
        gems += 1

        updateGems()

        saveGame()
        updatePlayersCount()
    });

    function updatePlayersCount() {
        $('.players-count')
            .text(`PLAYERS: (${players.length}/${maxPlayers})`);
    }
    $('.remove-success').on('click', function () {
        OpenConfirm(function (result) {
            if (result) {
                localStorage.removeItem('krupeczek_cardmaster_game')
                location.reload()
            }
        })
    })

    function updateCash(shouldSave = true) {
        $('#cash').text(cash)
        if (shouldSave) saveGame()
    }

    function updateGems(shouldSave = true) {
        $('#gems').text(gems)
        if (shouldSave) saveGame()
    }

    function startIncome(player) {
        const $el = player.element;
        const $progress = $el.find('.progress');

        function progress() {
            const config = Config.Players[player.configIndex];
            const finalSpeed = Math.max(0.05, config.speed / speedMultiplier)
            const duration = finalSpeed * 1000;

            $progress.css({
                height: '0%',
                transition: 'none'
            });

            setTimeout(() => {
                $progress.css({
                    height: '100%',
                    transition: `height ${finalSpeed}s linear`
                });
            }, 50);

            player.interval = setTimeout(() => {
                cash += Math.floor(config.income * cashMultiplier);
                updateCash();
                progress();
            }, duration);
        }

        progress();
    }

    function renderUpgrades() {
        $('.upgrades-list').html('');

        Config.Upgrades.forEach((upgrade, index) => {
            if (purchasedUpgrades.includes(index)) return;

            const canBuy = index === 0 || purchasedUpgrades.includes(index - 1);

            let name = '';
            if (upgrade.type === 'card-count') {
                name = `+ ${upgrade.value} max players`;
            }
            if (upgrade.type === 'cash-multiplier') {
                name = `Income x${upgrade.value}`;
            }

            if (upgrade.type === 'speed') {
                const percent = Math.round((1 - upgrade.value) * 100)
                name = `Speed +${percent * -1}%`
            }

            const costCash = upgrade.cost.cash || 0;
            const costGems = upgrade.cost.gems || 0;

            const $upgrade = $(`
            <div class="upgrade-container ${!canBuy ? 'locked' : ''}" data-index="${index}">
                <div class="upgrade-name">${name}</div>
                <div class="upgrade-price-wrapper">
                    ${costCash > 0 ? `<div class="upgrade-price cash">$ ${costCash}</div>` : ``}
                    ${costGems > 0 ? `<div class="upgrade-price gems"><i class="fa-solid fa-gem"></i> ${costGems}</div>` : ``}
                </div>
            </div>
        `);

            if (!canBuy) {
                $upgrade.css({
                    opacity: 0.5,
                    pointerEvents: 'none'
                });
            }

            $('.upgrades-list').append($upgrade);
        });
    }

    function applyPlayerStyle(player) {
        const config = Config.Players[player.configIndex];
        const color = config.color;

        player.element.css({
            background: color + 'b0',
            boxShadow: `0 0 .75rem ${color}`,
            borderColor: '#ffffffaf'
        });

        player.element.find('.progress').css({
            background: color
        })
    }

    function setupUpgrade(player) {
        player.element.on('click', function () {
            const currentIndex = player.configIndex;
            const nextIndex = currentIndex + 1;
            const nextConfig = Config.Players[nextIndex];

            if (nextConfig && cash >= nextConfig.upgradeCost) {
                cash -= nextConfig.upgradeCost
                gems += 1

                updateCash()
                updateGems()

                clearTimeout(player.interval);

                player.configIndex = nextIndex;
                player.level = nextIndex + 1;

                const currentConfig = Config.Players[currentIndex];
                player.element.find('.player-level').text(player.level);
                applyPlayerStyle(player)

                const upgradeNext = Config.Players[nextIndex + 1];
                if (upgradeNext) {
                    player.element.find('.player-upgrade-cost')
                        .text(`$${upgradeNext.upgradeCost}`);
                } else {
                    player.element.find('.player-upgrade-cost').text('MAX');
                }

                startIncome(player)

                saveGame()
            }
        });

        const currentIndex = player.configIndex;
        const nextIndex = currentIndex + 1;
        const upgradeNext = Config.Players[nextIndex];
        if (upgradeNext) {
            player.element.find('.player-upgrade-cost')
                .text(`$${upgradeNext.upgradeCost}`);
        } else {
            player.element.find('.player-upgrade-cost').text('MAX');
        }
    }

    function saveGame() {
        const data = {
            cash: cash,
            gems: gems,
            newPlayerCost: currentPlayerCost,
            players: players.map(p => ({
                configIndex: p.configIndex,
                level: p.level
            })),
            maxPlayers: maxPlayers,
            cashMultiplier: cashMultiplier,
            purchasedUpgrades: purchasedUpgrades,
            speedMultiplier: speedMultiplier
        };

        localStorage.setItem('krupeczek_cardmaster_game', JSON.stringify(data));
    }

    function loadGame() {
        const saved = localStorage.getItem('krupeczek_cardmaster_game');
        if (!saved) {
            $('.new-player').text(`NEW PLAYER ($${Config.NewPlayerCost})`)
            return
        }

        const data = JSON.parse(saved);

        cash = data.cash
        gems = data.gems
        updateCash(false)
        updateGems(false)

        speedMultiplier = data.speedMultiplier ?? 1;

        currentPlayerCost = data.newPlayerCost ?? Config.NewPlayerCost

        $('.new-player').text(`NEW PLAYER ($${data.newPlayerCost})`)

        data.players.forEach(savedPlayer => {
            createPlayerFromSave(savedPlayer);
        });

        maxPlayers = data.maxPlayers ?? 5;
        cashMultiplier = data.cashMultiplier ?? 1;
        purchasedUpgrades = data.purchasedUpgrades ?? [];

        $('.income').text(`INCOME: x${cashMultiplier} | SPEED: x${speedMultiplier}`)

        renderUpgrades()
        updatePlayersCount()
    }

    function createPlayerFromSave(savedData) {

        const newPlayer = {
            level: savedData.level,
            configIndex: savedData.configIndex,
            element: null,
            interval: null
        };

        const $newPlayer = $(`
        <div class="player">
            <div class="progress"></div>
            <div class="player-level">${newPlayer.level}</div>
            <div class="player-upgrade-cost"></div>
        </div>
    `);

        newPlayer.element = $newPlayer;
        $('.players').append($newPlayer);
        players.push(newPlayer);

        applyPlayerStyle(newPlayer);
        setupUpgrade(newPlayer);
        startIncome(newPlayer);

        const nextConfig = Config.Players[newPlayer.configIndex + 1];
        if (nextConfig) {
            newPlayer.element.find('.player-upgrade-cost')
                .text(`$${nextConfig.upgradeCost}`);
        } else {
            newPlayer.element.find('.player-upgrade-cost')
                .text('MAX');
        }
    }

    $('#close-menu').on('click', function () {
        $('.upgrades-container').css('display', 'none')
        $('.players').css('filter', 'none')
    })

    $('.upgrades-btn').on('click', function () {
        $('.upgrades-container').css('display', 'flex')
        $('.players').css('filter', 'blur(3px)')
    })

    $(document).on('click', '.upgrade-container', function () {

        const index = parseInt($(this).data('index'))
        const upgrade = Config.Upgrades[index]

        const costCash = upgrade.cost.cash || 0
        const costGems = upgrade.cost.gems || 0

        if (cash < costCash) return
        if (gems < costGems) return

        cash -= costCash
        gems -= costGems

        if (upgrade.type === 'card-count') {
            maxPlayers += upgrade.value
            updatePlayersCount()
        }

        if (upgrade.type === 'cash-multiplier') {
            cashMultiplier = upgrade.value
        }

        if (upgrade.type === 'speed') {
            speedMultiplier = upgrade.value

            players.forEach(player => {
                clearTimeout(player.interval)
                startIncome(player)
            })
        }

        $('.income').text(`INCOME: x${cashMultiplier} | BONUS SPEED: ${speedMultiplier}`)

        purchasedUpgrades.push(index);

        updateCash();
        updateGems();
        renderUpgrades();
        saveGame();
    });
})