(function (window) {
  function Promise2(excutor) { 
    const PENDING = 'pending'
    const REJECTED = 'rejected'
    const RESOLVED='resolved'
    const that=this
    this.status = PENDING
    this.data = undefined
    this.callbacks=[]
    function resolve(value) {
      if (that.status !== PENDING) {
       return
     }
     that.status = RESOLVED
     that.data = value
     if (that.callbacks.length > 0) {
       setTimeout(() => {
        that.callbacks.forEach(callbacksObj => {
           callbacksObj.onResolved(value)
         })
       })
     }  
    }

    function reject(reason) {
      if (that.status !== PENDING) {
        return
      }
      that.status = REJECTED
      that.data = reason
      if (that.callbacks.length > 0) {
        setTimeout(() => {
          that.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }
    try {
      excutor(resolve,reject)
    } catch (error) {
      reject(error)
    }
    
   
  }
  Promise2.prototype.then = function (onResolved, onRejected) {
    const that=this
    onResolved=typeof onResolved==='function'?onResolved:value=>value
    onRejected=typeof onRejected==='function'?onRejected:reason=>{throw reason}
    return new Promise2((resolve, reject) => {

      function handle(callback) {
        try {
          const result = callback(that.data)
          if (result instanceof Promise2) {
            result.then(value => {
              resolve(value)
            }, reason => {
              reject(reason)
            })
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }  
      }

      if (that.status === PENDING) {
        that.callbacks.push(
          {
            onResolved() {
            handle(onResolved)
          },
            onRejected() {
            handle(onRejected)
            }     
            }
        )
      } else if (that.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved)        
        });
      } else {
        setTimeout(() => {
          handle(onRejected)           
        });
      }
    })

    

  }

  Promise2.prototype.catch = function (onRejected) {
    return this.then(undefined,onRejected)
    
  }

  Promise2.all = function () {
      
  }

  Promise2.race = function () {
      
  }

  Promise2.reject  = function(reason) {
      
  }

  Promise2.resolve = function (value) {
      
  }

  window.Promise2=Promise2
})(window)