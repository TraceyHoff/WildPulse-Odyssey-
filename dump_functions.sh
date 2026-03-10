#!/bin/bash
cat index.html | awk '/window.renderPartyList = function/,/^};/'
