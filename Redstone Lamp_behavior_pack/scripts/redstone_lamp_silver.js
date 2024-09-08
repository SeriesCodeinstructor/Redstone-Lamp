import { world, system, BlockLocation } from "@minecraft/server";

// Register a system that runs every tick
system.runInterval(() => {
    // Check for newly placed redstone lamps
    checkForNewLamps();
});

function checkForNewLamps() {
    // Get all players in the world
    const players = world.getAllPlayers();

    for (const player of players) {
        // Check a small area around the player for newly placed lamps
        const playerPos = player.location;
        for (let x = -5; x <= 5; x++) {
            for (let y = -5; y <= 5; y++) {
                for (let z = -5; z <= 5; z++) {
                    const blockPos = new BlockLocation(
                        Math.floor(playerPos.x) + x,
                        Math.floor(playerPos.y) + y,
                        Math.floor(playerPos.z) + z
                    );
                    const block = player.dimension.getBlock(blockPos);

                    // Check if the block is our silver redstone lamp in the off state
                    if (block && block.typeId === "darkgato:redstone_lamp_silver_off") {
                        handleNewLamp(block);
                    }
                }
            }
        }
    }
}

function handleNewLamp(block) {
    const dimension = block.dimension;
    const blockPos = block.location;

    // Teleport nearby 'red:tets' entity 100 blocks up
    const nearbyEntities = dimension.getEntities({
        location: blockPos,
        maxDistance: 1,
        type: "red:tets"
    });

    if (nearbyEntities.length > 0) {
        const entity = nearbyEntities[0];
        entity.teleport(
            { x: entity.location.x, y: entity.location.y + 100, z: entity.location.z },
            { dimension: entity.dimension }
        );
    }

    // Summon the 'on' version of the lamp
    dimension.spawnEntity("darkgato:redstone_lamp_silver", blockPos);

    // Remove the 'off' version of the lamp
    block.setType("minecraft:air");
}

// Listen for block place events
world.events.blockPlace.subscribe((event) => {
    if (event.block.typeId === "darkgato:redstone_lamp_silver_off") {
        handleNewLamp(event.block);
    }
});
