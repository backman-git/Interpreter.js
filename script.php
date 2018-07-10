function add($a,$b){
    return $a+$b;
}

$x=1;
$y=2;
$c=3;
$c = add(add($x,$y),$c);

if ($c > 5){$c=0;}else{$c=100;}