const jcode1 = {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            id: {
                type: 'Identifier',
                name: 'binarySearch',
                loc: {
                    start: {
                        line: 1,
                        column: 9
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            },
            params: [
                {
                    type: 'Identifier',
                    name: 'X',
                    loc: {
                        start: {
                            line: 1,
                            column: 22
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                },
                {
                    type: 'Identifier',
                    name: 'V',
                    loc: {
                        start: {
                            line: 1,
                            column: 25
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                },
                {
                    type: 'Identifier',
                    name: 'n',
                    loc: {
                        start: {
                            line: 1,
                            column: 28
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                }
            ],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'low',
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 8
                                        },
                                        end: {
                                            line: 2,
                                            column: 11
                                        }
                                    }
                                },
                                init: null,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 8
                                    },
                                    end: {
                                        line: 2,
                                        column: 11
                                    }
                                }
                            },
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'high',
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 13
                                        },
                                        end: {
                                            line: 2,
                                            column: 17
                                        }
                                    }
                                },
                                init: null,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 13
                                    },
                                    end: {
                                        line: 2,
                                        column: 17
                                    }
                                }
                            },
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'mid',
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 19
                                        },
                                        end: {
                                            line: 2,
                                            column: 22
                                        }
                                    }
                                },
                                init: null,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 19
                                    },
                                    end: {
                                        line: 2,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        loc: {
                            start: {
                                line: 2,
                                column: 4
                            },
                            end: {
                                line: 2,
                                column: 23
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                name: 'low',
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 4
                                    },
                                    end: {
                                        line: 3,
                                        column: 7
                                    }
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: 0,
                                raw: '0',
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 10
                                    },
                                    end: {
                                        line: 3,
                                        column: 11
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 3,
                                    column: 4
                                },
                                end: {
                                    line: 3,
                                    column: 11
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 3,
                                column: 4
                            },
                            end: {
                                line: 3,
                                column: 12
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                name: 'high',
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 4
                                    },
                                    end: {
                                        line: 4,
                                        column: 8
                                    }
                                }
                            },
                            right: {
                                type: 'BinaryExpression',
                                operator: '-',
                                left: {
                                    type: 'Identifier',
                                    name: 'n',
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 11
                                        },
                                        end: {
                                            line: 4,
                                            column: 12
                                        }
                                    }
                                },
                                right: {
                                    type: 'Literal',
                                    value: 1,
                                    raw: '1',
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 15
                                        },
                                        end: {
                                            line: 4,
                                            column: 16
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 11
                                    },
                                    end: {
                                        line: 4,
                                        column: 16
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 4,
                                    column: 4
                                },
                                end: {
                                    line: 4,
                                    column: 16
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 4,
                                column: 4
                            },
                            end: {
                                line: 4,
                                column: 17
                            }
                        }
                    },
                    {
                        type: 'WhileStatement',
                        test: {
                            type: 'BinaryExpression',
                            operator: '<=',
                            left: {
                                type: 'Identifier',
                                name: 'low',
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 11
                                    },
                                    end: {
                                        line: 5,
                                        column: 14
                                    }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'high',
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 18
                                    },
                                    end: {
                                        line: 5,
                                        column: 22
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 5,
                                    column: 11
                                },
                                end: {
                                    line: 5,
                                    column: 22
                                }
                            }
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'mid',
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 11
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'BinaryExpression',
                                            operator: '/',
                                            left: {
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'low',
                                                    loc: {
                                                        start: {
                                                            line: 6,
                                                            column: 15
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 18
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'high',
                                                    loc: {
                                                        start: {
                                                            line: 6,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 25
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 25
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 2,
                                                raw: '2',
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 28
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 28
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 8
                                            },
                                            end: {
                                                line: 6,
                                                column: 28
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 6,
                                            column: 8
                                        },
                                        end: {
                                            line: 6,
                                            column: 29
                                        }
                                    }
                                },
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'BinaryExpression',
                                        operator: '<',
                                        left: {
                                            type: 'Identifier',
                                            name: 'X',
                                            loc: {
                                                start: {
                                                    line: 7,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 7,
                                                    column: 13
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: true,
                                            object: {
                                                type: 'Identifier',
                                                name: 'V',
                                                loc: {
                                                    start: {
                                                        line: 7,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 7,
                                                        column: 17
                                                    }
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'mid',
                                                loc: {
                                                    start: {
                                                        line: 7,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 7,
                                                        column: 21
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 7,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 7,
                                                    column: 22
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 7,
                                                column: 12
                                            },
                                            end: {
                                                line: 7,
                                                column: 22
                                            }
                                        }
                                    },
                                    consequent: {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            operator: '=',
                                            left: {
                                                type: 'Identifier',
                                                name: 'high',
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 16
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'BinaryExpression',
                                                operator: '-',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'mid',
                                                    loc: {
                                                        start: {
                                                            line: 8,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 8,
                                                            column: 22
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
                                                    raw: '1',
                                                    loc: {
                                                        start: {
                                                            line: 8,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 8,
                                                            column: 26
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 26
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 8,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 8,
                                                    column: 26
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 8,
                                                column: 12
                                            },
                                            end: {
                                                line: 8,
                                                column: 27
                                            }
                                        }
                                    },
                                    alternate: {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '>',
                                            left: {
                                                type: 'Identifier',
                                                name: 'X',
                                                loc: {
                                                    start: {
                                                        line: 9,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 9,
                                                        column: 18
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'MemberExpression',
                                                computed: true,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'V',
                                                    loc: {
                                                        start: {
                                                            line: 9,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 9,
                                                            column: 22
                                                        }
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'mid',
                                                    loc: {
                                                        start: {
                                                            line: 9,
                                                            column: 23
                                                        },
                                                        end: {
                                                            line: 9,
                                                            column: 26
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 9,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 9,
                                                        column: 27
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 9,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 9,
                                                    column: 27
                                                }
                                            }
                                        },
                                        consequent: {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'low',
                                                    loc: {
                                                        start: {
                                                            line: 10,
                                                            column: 12
                                                        },
                                                        end: {
                                                            line: 10,
                                                            column: 15
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'BinaryExpression',
                                                    operator: '+',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'mid',
                                                        loc: {
                                                            start: {
                                                                line: 10,
                                                                column: 18
                                                            },
                                                            end: {
                                                                line: 10,
                                                                column: 21
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        raw: '1',
                                                        loc: {
                                                            start: {
                                                                line: 10,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 10,
                                                                column: 25
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 10,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 10,
                                                            column: 25
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 10,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 10,
                                                        column: 25
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 10,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 10,
                                                    column: 26
                                                }
                                            }
                                        },
                                        alternate: {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'mid',
                                                loc: {
                                                    start: {
                                                        line: 12,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 12,
                                                        column: 22
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 12,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 12,
                                                    column: 23
                                                }
                                            }
                                        },
                                        loc: {
                                            start: {
                                                line: 9,
                                                column: 13
                                            },
                                            end: {
                                                line: 12,
                                                column: 23
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 7,
                                            column: 8
                                        },
                                        end: {
                                            line: 12,
                                            column: 23
                                        }
                                    }
                                }
                            ],
                            loc: {
                                start: {
                                    line: 5,
                                    column: 24
                                },
                                end: {
                                    line: 13,
                                    column: 5
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 5,
                                column: 4
                            },
                            end: {
                                line: 13,
                                column: 5
                            }
                        }
                    },
                    {
                        type: 'ReturnStatement',
                        argument: {
                            type: 'UnaryExpression',
                            operator: '-',
                            argument: {
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                loc: {
                                    start: {
                                        line: 14,
                                        column: 12
                                    },
                                    end: {
                                        line: 14,
                                        column: 13
                                    }
                                }
                            },
                            prefix: true,
                            loc: {
                                start: {
                                    line: 14,
                                    column: 11
                                },
                                end: {
                                    line: 14,
                                    column: 13
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 14,
                                column: 4
                            },
                            end: {
                                line: 14,
                                column: 14
                            }
                        }
                    }
                ],
                loc: {
                    start: {
                        line: 1,
                        column: 30
                    },
                    end: {
                        line: 15,
                        column: 1
                    }
                }
            },
            generator: false,
            expression: false,
            async: false,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 15,
                    column: 1
                }
            }
        }
    ],
    sourceType: 'script',
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 15,
            column: 1
        }
    }
};
module.exports = {
    jcode1: jcode1
};
