import rewire from "rewire"
const index = rewire("index")
const buildMatcherRegex = index.__get__("buildMatcherRegex")
// @ponicode
describe("buildMatcherRegex", () => {
    test("0", () => {
        let callFunction: any = () => {
            buildMatcherRegex(-100, "levels")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            buildMatcherRegex(0, "tabs")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            buildMatcherRegex(100, "level")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            buildMatcherRegex(-100, "tab")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            buildMatcherRegex(-5.48, "levels")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            buildMatcherRegex(NaN, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.setLevelSize", () => {
    test("0", () => {
        let callFunction: any = () => {
            index.setLevelSize(4)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            index.setLevelSize(5)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            index.setLevelSize(128)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            index.setLevelSize(1000)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            index.setLevelSize(11)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            index.setLevelSize(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.setLevelChar", () => {
    test("0", () => {
        let callFunction: any = () => {
            index.setLevelChar(">")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            index.setLevelChar("Z")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            index.setLevelChar(" ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            index.setLevelChar("*")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            index.setLevelChar("a")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            index.setLevelChar("")
        }
    
        expect(callFunction).not.toThrow()
    })
})
