var queue;

$scope.initialize = initialize function() {
    queue = [];
};

$scope.enqueue = enqueue function(elem) {
    queue.push(elem);
};

$scope.dequeue = dequeue function() {
    return queue.shift();
};

$scope.get = get function(index) {
    return queue[index];
};

$scope.reverse = reverse function() {
    queue.reverse();
    return queue;
};
