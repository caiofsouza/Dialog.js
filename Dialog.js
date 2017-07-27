(function(){

  var Dialog = {
    onAccept: null,
    template: function(options) {
      var self = this

      if (!options.button) {
        options.button = 'Confirmar'
      }

      var actionButton = DOMSlim.createEl('button', {
        class: 'd-action-button',
        data: {
          target: 'accept'
        },
        text: options.button
      })

      actionButton.onclick = function(e){
        self.hide()
        if (self.onAccept && typeof self.onAccept === 'function') {
          self.onAccept()
        } 
      }

      var dialogEl = DOMSlim.createEl('div', {
        class: 'd-dialog',
        child: [
          DOMSlim.createEl('div', {
            class: 'd-dialog-bg'
          }),
          DOMSlim.createEl('div', {
            class: 'd-dialog-content',
            child: [
              DOMSlim.createEl('div', {
                class: 'd-dialog-header',
                text: options.header
              }),
              DOMSlim.createEl('div', {
                class: 'd-dialog-message',
                text: options.message
              }),
              DOMSlim.createEl('div', {
                class: 'd-dialog-footer',
                child: actionButton
              })
            ]
          })
        ]
      })

      return dialogEl

    },
    show: function (options) {
      var body = document.body
      var hasDialog = document.querySelector('.d-dialog')
      var dialogContent = this.template(options)

      if (hasDialog) {
        hasDialog.parentElement.removeChild(hasDialog)
      }

      body.appendChild(dialogContent)
      setTimeout(function(){
        dialogContent.style.opacity = 1
      }, 500)

      if (options.onAccept && typeof options.onAccept === 'function') {
        this.onAccept = options.onAccept
      }
    },

    hide: function() {
      var dialogContent = document.querySelector('.d-dialog')

      dialogContent.style.opacity = 0
      setTimeout(function(){
        var hasDialog = document.querySelector('.d-dialog')
        if (hasDialog) {
          hasDialog.parentElement.removeChild(hasDialog)
        }
      }, 500)
    }

  }



  if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = Dialog
  } else if(typeof define === 'function' && define.amd) {
    define(function () { return Dialog })
  } else if (typeof window !== 'undefined') {
    window.Dialog = Dialog
  }

}())
