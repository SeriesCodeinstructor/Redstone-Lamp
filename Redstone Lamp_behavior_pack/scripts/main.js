        import { BlockManager } from "./block_trigger";
        
        import { world, system } from "@minecraft/server";
        
        function main(){
            BlockManager.init();
            
        }
        
        system.run(main());
        