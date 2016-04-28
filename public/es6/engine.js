class engine{
    static mapGenBlock(elements){
        var block_height = 100,
            block_width = 100;

        
        // Build array
        var grid = [];
        for(var a=0;a<block_height;a++){
            grid[a] = [];
            for(var b=0;b<block_width;b++){
                grid[a][b] = 0;
            }
        }

        // loop through elements
        for(let i=1; i<elements.length; i++){

            // fill the array with the rarity number of elements
            var place_count = 0;
            while(place_count < elements[i].rarity){
                var random_a = Math.floor(Math.random() * block_height);
                var random_b = Math.floor(Math.random() * block_width);

                if(grid[random_a][random_b] == 0){
                    grid[random_a][random_b] = i;
                    place_count++;
                }


                // take a step back
                if(place_count == elements[i].rarity){
                    console.log('evaluate', i);

                    function clusterSize(a, b){
                        var count = 0;

                        count ++;

                        grid[a][b] = -1;


                        if(typeof grid[a][b-1] !== 'undefined'){
                            if(grid[a][b-1] == i)
                                count += clusterSize(a, b-1);
                        }
                        if(typeof grid[a][b+1] !== 'undefined'){
                            if(grid[a][b+1] == i)
                                count += clusterSize(a, b+1);
                        }
                        if(typeof grid[a-1] !== 'undefined'){
                            if(grid[a-1][b] == i)
                                count += clusterSize(a-1, b);
                        }
                        if(typeof grid[a+1] !== 'undefined'){
                            if(grid[a+1][b] == i)
                                count += clusterSize(a+1, b);
                        }

                        grid[a][b] = i;

                        return count;
                    }

                    for(a=0;a<block_height;a++){
                        for(b=0;b<block_width;b++){
                            if(grid[a][b] == i){
                                var cluster = clusterSize(a, b);
                                if(cluster < elements[i].cluster){
                                    grid[a][b] = 0;
                                    place_count--;
                                    console.log('remove ', i);
                                }
                                if(cluster > 10)
                                    console.log(cluster, ' ', i);
                            }
                        }
                    }
                }
            }


        }

        return grid;
    }

    static quickDrawMapBlock(block, map){
        var $body = $('body');
        var $block = $('<div class="helios-block"></div>');
        block.forEach(function(a){
            var $row = $('<div class="helios-row"></div>');
           a.forEach(function(b){
               var $cell = $('<div class="helios-cell" style="background-color: ' + map[b].color + '"></div>');
               $row.append($cell);
           });
            $block.append($row);
        });
        $body.append($block);
    }
}

// block size 100x100 10,000 cells
var map = [
    {name: 'Dirt',// first element is default and skipped
    reward: 0,
    cluster: 1,//Min cluster size 1-9
    rarity: 0,// num per block
    variance:1.2,// %higher or lower the rarity can be
    health: 100,// health -= weapon power - hardness;
    hardness: 0,
    color: '#000000'}
    ,
    {name: 'Vorite',
    reward: 354,
    cluster: 2,//Min cluster size 1-9
    rarity: 5000,// num per block
    variance:1.2,// %higher or lower the rarity can be
    health: 100,// health -= weapon power - hardness;
    hardness: 10,
    color: 'red'}
    ,
    {name: 'Argios',
    reward: 242,
    cluster: 2,//Min cluster size 1-9
    rarity: 1000,// num per block
    variance:1.2,// %higher or lower the rarity can be
    health: 100,// health -= weapon power - hardness;
    hardness: 10,
    color: 'orange'}
    ,
    {name: 'Demite',
    reward: 142,
    cluster: 2,//Min cluster size 1-9
    rarity: 500,// num per block
    variance:1.2,// %higher or lower the rarity can be
    health: 100,// health -= weapon power - hardness;
    hardness: 10,
    color: 'yellow'}
    ,
    {name: 'Blue Stuff',
    reward: 142,
    cluster: 2,//Min cluster size 1-9
    rarity: 250,// num per block
    variance:1.2,// %higher or lower the rarity can be
    health: 100,// health -= weapon power - hardness;
    hardness: 10,
    color: 'lime'}
    ,
    {name: 'super rare',
    reward: 142,
    cluster: 2,//Min cluster size 1-9
    rarity: 125,// num per block
    variance:1.2,// %higher or lower the rarity can be
    health: 100,// health -= weapon power - hardness;
    hardness: 10,
    color: 'cyan'}
];
//var x = engine.mapGenBlock(map);

//engine.quickDrawMapBlock(x, map);