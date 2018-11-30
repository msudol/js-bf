// function to set character of string at a location
var setCharAt = function(str, index, chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

// incremental characters of string: str, with options object and a callback
var inc = function(str, opts, callback) {
    
    var loc = opts.loc,
        skipSpecial = opts.skipSpecial,
        x, end, cc;
    
    // if loc is undefined
    if ((loc === undefined) || (loc == null)){
        loc = str.length - 1;
    }
    
    // get the char at loc
    cc = str.charCodeAt(loc);

    end = 126; 
    if (skipSpecial) end = 122;
    
    // at the end for this loc
    if (cc >= end) { 
    
        // at the end for the entire string
        if (loc == 0) {
            console.log("Done");
            return;
        } else {
            opts.increment = true;
        }

        if (skipSpecial) {
            x = setCharAt(str, loc, "0");
        } else {
            x = setCharAt(str, loc, " ");    
        }
            
        opts.loc = opts.loc - 1;
        
        callback(x);
        
        setTimeout(function() {
            return inc(x, opts, callback);
        }, 1);
        
    } else {  

        // skip some special chars
        if (skipSpecial) {
            if (cc == 57) cc = 64;
            if (cc == 90) cc = 96; 
        }
        
        var x = setCharAt(str, loc, String.fromCharCode(cc + 1));  

        callback(x);
        
        // set loc back to string length - 1
        opts.loc = str.length - 1;
        
        setTimeout(function() {
            return inc(x, opts, callback);
        }, 1);
 
    }
    
    return;
    
}


