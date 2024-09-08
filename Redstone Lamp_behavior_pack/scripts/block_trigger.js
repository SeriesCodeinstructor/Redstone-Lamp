import { system, world } from '@minecraft/server';

export class BlockManager {
    static init(){
        world.beforeEvents.worldInitialize.subscribe(initEvent => {
            initEvent.blockComponentRegistry.registerCustomComponent('darkgato_redstone_lamp_silver_off:trigger', {
  onPlace: e => { e.player.runCommand("function on"); },
});

        });
    }   
}
