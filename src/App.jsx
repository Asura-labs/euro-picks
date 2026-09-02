import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

// ════════════════════════════════════════════════════════════════════
//  ⚙️  ΡΥΘΜΙΣΕΙΣ — ΒΑΛΕ ΕΔΩ ΤΑ ΚΛΕΙΔΙΑ ΑΠΟ ΤΟ SUPABASE
// ════════════════════════════════════════════════════════════════════
const SUPABASE_URL = "https://wyvxqewannwjcdwwlfiy.supabase.co";
const SUPABASE_KEY = "sb_publishable_1pdibKQyLpe3kJRoalhrEQ_jkGeColT";
// ════════════════════════════════════════════════════════════════════

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LOGO="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAADwCAMAAABFaIE0AAAA/1BMVEX+pQD+qAD+ngAWDqMeC6EECtAHGd7+qAAMFtYaDqwOAFIaDKUKFtj/ywD+WwD/yAB/AH//yQD/zgChXmRRN6vYejD/PQDFdEh2So+GU4QAAD9VAKp8SHy0czT/AP8A//9/AABFLq9MTH9VVapqTYuqVVWrZ1WKWJP/qlUAAAANFc8aDacGGuYVEbggCpb/pwAeC5v+mAD/tgD/xgD//wAAAP/+fgD/qQAAALIAAH3/mAD/0wD/vAAhC6T9iwH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnxWGAAAAQHRSTlNdoCoUpg9l0NXOBmSjDwSfAmDX/f79BP7+/wQD/xMBAQK+CgNzA4e8AwD+/v7+/vv+/Pv8AQEDBgQCCv0H/v4BB5T00QAAKERJREFUeNrtnWmD2riyhm3TtOkFmCaTOdvdd3WTEIyQwO0e//9/dVWlxfIq29gsSevDOZMEDNajqnqrVDLecX8cZ+yJPfa/Nbz0t/xrHWP/W9M45l/8L//y22Dj8XCcTA6dvqs9jsfJQX67xwmMJxh3euCf4K/VDRweD40f5R0fj48wGub1seewP+fQeJVjJ3CPHS7V+8tXjL/Lj+/F7iiJHIGXwPTwPRsf3z8+zB8eHoChwidI14O7G208EXODe/LkeGlrdP9wXOrOni3yOPQ9PU1wNXSjtj/iuyZPkpjFSYwfMGyO8M8P+qMOx5qZ8R4+3j7GGXdEL839gdw5XjppOwkT8tRwIbF8/26B208eYD0PNdAk7mBCj12MDsxGQZPIbE6lISlKeg3LxHt4+zHOKIKrf+X370+dwP34br+3MB4ec+Duvo8whIcgbX0EfJ3Hp5xv7PZRaHf7KnAN4zzgfnx0A9d4pwVwD99HGQ9Px1ZWBzMweTrtS9xBwCt9WDM4zU8ifPsEZ08n3JZDkUzF970bwsIfyeHQA1wvO/zJwX18f/o7aSYnrERg+xjKOR9PBlcyx0qq3cAdusS4H+1j3GjgpNEdGjWJcJIfQy0T8WE5gXk6uFqeZwFX1DkfRXAf44H7AHfZ9FXvhg2rOaMbDdxbAVyTk+0IrslXnxOcmMxamxN//TS4hR8tcucFVxMsRwVX71WHIXescZN3o1j45CrAGa96FnDl9HGAuXyY7I9Vydvk7mOcdTL5BDcIPmEFk31FOfnuY2TffA3g3rqCayD31hXcqVg/Kuqsx6PQYmNw+5H55hsFV5tRDgyuDcZSmDuSkbjJHET65tsEV18YGBVcFUeRrx7zScFB6MkfI+Ygcq5+JnAYLnPgyGS0Gnoumdnn7G3yfdQhfbP38M0etw7urWRx1W51SJxCWea2eSdYbBiRHG6kF8BVjn7cvl0JuJp6+QD7H5UmB/uF30dNQb7fkZbg+uG8BnBk0i0S9N7AMrsu++Pk7mM4zVonhw4ucG/fbt5VnlBubTvessrXoTnNHAQjNAzsHeCeDpP+I/P7DnDfrgxcmUwzx6z1Yr/vYHC9QUIa3gzu9Yn07kazA7YA9+0S4MhkGNH8oxnu28NEdZc9kkknhwsNMW/Q9fP9e3uMuH/pPbw2g5sM0FiJ4Bqi4sXAPdw9OId4ias74M34yr2QJu1EKzQfwTvlh7x9yL9pG1TBVbrADWVxDSLnYuCe2vn8J6fdmnl6fLDNs57aGzbg2Z8P3bEPP1qxA3lyeXAYSi8FrmUkmNy1A3cET+kKncI1PjzZEsDumn26E//cJgH52cB9ezh0AXc8tPD5BzEHdy4FPdGa0qV7xItln/L+eLDGUbW+HsG+W/hKb3YmcK8DgZu6wBUs7tsQacik0ZIA3B5Tn6MLMLiECc7Ifl/Z8gxFkcOdS+B8PCC4Vz0ML/XfrwKc+IS+I/s++0HBNdUAcuD2Q4EjrkT07qj2U53REJp+Ds1nQ4jcAMkSkQqMAK52ALj9dAiLc4B77Qmuatiu0gWu/YI57B2RFTdbji7DFNz+4ezGhBbKp3wKUirQvT01gRPjnkx759/T1q7yBsC5JBFuyh2c4ER4O7QKLU+OQOkC9zpzjPr8x65VntPiiq6yocLayeK+NQPZH9tok7bHko4TR/J45wJ3wsjXKq8EXM/Yemwu/bzdPUJocqUqb3eHw3EQCx8KXCWNC1ncYQRwU6eqlMc7XNP9RB7bumZXzWdEi3vOg3t9VWq1THpAcK9FcAOo2eNhP2k2OBEWplJ7fnNEwn1bOfd4dz3gGsRrJ3CNxlt0lYOkIYe75t1IdSGHQxXeYN/25K3TeM8F7tkhXocDN7jFQa3StZssL+TaBIF9tE9wQ4D79tBmvDm7AVSfqstVdjgxffgpwb22Bjd1gKuVVt2GqngVS7LVkfCXBpeTs/bcd7S4gcaTrjHfNbaBfIL7Vi90ZnmLm50FnNpHdW2C/Hzgntvf0ZTcNyWUFeBGR/d6pwrqrk2QXxrcvhHcaxlci1rBqeC0OHUViLqBa26BvDlwB8el8uAms64Fnx7cHibtLA4ss0M60NzJeh5wrtl+nrTNTPf7owPcsdniutfuWhjcnrQC9zBpHctdXvc84IjL4mbT9tVeB4sZOQVcEeNrQbRW2pHJql2z/Tppm8jBgzYaL/XgzdZnADd1gIN9v7Yr8d71qfvBwM1gW6ssYQuZYFaAdBQHwDanbdfnxJHyu8D1x7ruAu550tL7751Xsna8TgX3169fv/zTw+zVUWedkrbgZof9oa02aXbbdy5ws94jb3EOO2lrcsJTOi80GLgv2z//3G7//NKIzrpL6Q5a6c9TDe7VAW59L4RFi1HZK3To4OAgyrV5ppmbxP1QrnIG3GBsv/4+qzW4Z3un5kAm+eJAucLWSp4cHh0RTqwAF7j9dIAuL/LoNJT185RM985WjOnzqxPc4yDgZr8rbjD+qe4ys8IB8IND7cAbnEFh6lImUGRzWtwg4FrM4Bpsrume4B/d3F6nA1nc7GvG7c/tl1krboQ4v+DsHtonm2/z8OzMSyYAbt0IjgwxhKZwyZz16z3uIheY460c8W/2924Ms8kw4IyjVKPSWz4Xd7T3bnDiXVOZj1bcJh6U2T85C6xC5Uhwaxjjgrt369P17H6qDr1A2MTgeTiq25tMW2ATHrejodc6yhw2EeeqCByKAcsdy/Hiz9OJuc2Dvk2pcQ7F2/xWVWsVH43gckPcPf4VTMOA4KYt7kh86PP9/XQ6OeZbPibT6f1zu8zE1ianWJxtcEJZbrcPFT6vwrNPWi6M5/vpJH+b5CDu895lsUadlsFZCIcDJyJuu0wfPnb2/Cz46SH+MEOmrSYkV4LpDc42OJEPwJiVHV4Ft/3kuf2HVNxmu4IOiFMBrmncH6eHniOfarbylRm84hJqnfTnmjr2bZdLg8FtRRqHaWkpTh36FHYGKkpNji5wA9kbzOF6PfoNrXOesjc4y+C2X+rqBYdepdRhxhOZOsBZttx9kNyBnePz6OBESrHvBq76X9fG4OrygNo9+8PxeXxuMzi83wzulPGce1w++Mr1+AZX8M8OcBBmKsa/Z/a2rs8XDzW1nfHBwW2eD9z+8LxWgnV9EsLatwuDyz+e3wWuLhJ42uC+Nhh3dVncufU4hMFNj2cEB3F7XVKwRkm23olYv3758rdqHCUN7AZXUYn9bb/4U4P7fd1q8yN/rmc6vsGJ2zwfOKyedBuVE/b7drsN/1rxj+vn4vncFhZX9nfMGFyDoywLofMJyxnqonOC208bksa2GKVwEGJvXfKgpQ2GXuAI8xW4rzN3qKkqNk7GlWFT+djD84GDwH3qNQWev2yVNaxzDnRdYQF9wHEaaGXyPzN3Wbx3legER4kfek5wMsydOGYqAG3/alvva9XH9QNHlMFtQ1fNYF3T43ToUGzonnv/2/784Pb7U8lBiDMBKM+tYhJbgNuXIlwQqg/wiGtLA26xd0m9Zz+Ivs2zghuAnMmNt3/Lc5tWVQ6JjKqvNdsfFeBiLU22Yfx/k6mLXF2YG4mcdZvnBQcFlBPJ/UXN69fcF3+ufJoBgmsQO2VwNPOUHomdCTwIolpy6zHszXzcmcGdbHPVIe7+UCcTZo1+twSOpcFWip+QMapyzz4C5SiSgsHJ3Vsbt+cGB+SmJ3ymCnHbv9gw72t+PbE7uMxTekKmtIhWwggqW2Wwz2JQo4PbtH8U6dzgcDqfe1/0b1td08g+p7ZBrDM4xkwSFxCK85/KQl1zW071h+8HdJel27wAOPj83uiyLM7sX5Daxj6ncZfAEe0p/ZSq2qNVNXh9zRXq1P/VVFCGNDr0KvmPuQQ4shch/f553eOjZyHWTcKZ8ZJNXX1dwaUL4ykD9JTOqgFm/tN6cuR+AHTyNgs/knoRcHI1ArrZrGuI20plYrA1tSl2BUdFEqcMjhFq70c1sns+1Nm8mIAJoFufjK20PC8ELv1nQubeV5Hrfv3ye7cQt9WO8tmBrRc45Sk9bXDyRJ7zTvf1C5Qcp88zu9i67gJN3WZ5Ji8DjsYk8Ld6fJl1CnHbP2frGd6Oqyl4v3fE0iI46qtcILDAOa+yXjecYcevKLzLLF8qdzbTSJdSf5sXAcc48ULDTczT753AfVG3c3D1cne0uNTylJwWtjXWnVROFbsM3rpxW1iH72d5m4fq2/Tuxxt1N8Ngy0uPELsW/+v++bnFEpr9L7zjn2XDc6sOpeZvmJcVXHhK2UfpiYSuy3Xu75sPCe/l81oBXqvbfMb2UpRxdZf1yNkHgx0vOXwvCGCVb31KoOtVtheWbm2mWhCn070Xhh75j+l+jC+G5a4tlikpKyYwJ7e57WVfmOs2Edn0iNCmDavBExccZ9R9KCMLxc0PGAgCtD6PyKk6TiovNpk8GnNN/7vDfB0OTV8xt5+Qklh7SsJKCUzzOLRjl/mJyaT6NtWFjnvXOf+zWxzl2t6E5E45i1mAHjM4/ud+X/91/xUPSex/4+N9M/CUcgQlcIMNeXKw9il6cO4DD7k4L3RucFhU2iob49Z0eVnipH7hBUfx115Imo711RbEV1oJ6svjj2N2n6UftSHXBi41ukRwS02VCe0vJRcdbBGHEpydxF3t8C7ELVDcMnALclly7Bye8lbBmTCi7U1upGCQYxcGp7+IqS8PtlgXfEFvGxxmuHlu2XzFhF7U4FTwHdhTMgzkhLKbBpcQfyO5xeWFHlwW3CiaUkhoQoLACxaDe98xwPE4ptVzg4w2vo0oJv51WJzxlPFQwnUhlmfs+aFMffjVg6MSUpkbDSQ3nmTLT/gQaYUXBidcmklTeMW/LjrDZAvEpmtEAWdXDo6SwPcCUvINVAQRgWgT5ggxTuW9ib++pDhZ6PAblj0lI53DVCqokcBT+cUWy5+L6wYHqnqz2XqseP/CF6kAl+TcZxxeg6rkxlPmNgYA2IIsAg+WYmtnB4xTa98KyPkLSq8ZXJrwcIMOMc5/URH88e8tQak4b6QDjRunogdUyuI4buugKFMeO7+uxBekauvQD9qSE+RZDhuWYwbODr3BDU5NwMZf2IWjVDlKP2asKnva+H/QpggUJ92jliRSo5SKiQoLtcfOfT/OFsoUN2FLcowsvDy28nRcHThGA/NVA3vtakcZMF5Me5XFNaS9+C9/sK7YhIPzgpgQxltMtvreft4hCG4ZgzBocSW4VAlbF3u9CDjKUmVw6BS5NfWx+jtWjAbyDaV/yUdH3/dIlzsXQkDq8DD0PUqctZCshJrGef9uQ/CJU1ymjDEzBRY2NrRmHhacth+FIi540I1PS4olNuBoQ2q82Wz8gLSuQ+Nl1TfZbENvQbhr3vwKTwlbvpucu3NNP8sKCjlrA4lzxeCotdpESEi5pdlUJsBKUMKNqlfU3VpC8aIbyLBaLVuamKtmU8dY83xrm0psD10wHo81u2th2CKg+hXY+OA56qDguG1wfmZwQiDARG7Kua12URVMi9ERJm7RolorPkxcNO+tBPRFUx7GU7PZlFgZNM9xE7p34fhk4oWeV8LGxthsGBRcGmd3urHk70IanEiR0hrUkA1UM2E8s56Nlzq9JSQhXlkcwIcztxa2lg+N87bjEQc33LMqhDeRzvJx9oiGBEdzBpcJApYGIuBsNuVMhlId4vxqg0iFAWQXbZQwxunl1rz44BAsrlGPs1RWAXJVVG7zh1yALVoKnJyHXhBy9eDMupVTrJ0O5Sg1qyad6WBUTQQKR3FOHrhK98WwtAlFQhCItGpT5agzTaW3CSmvxIA5nHPJBCX3PJa5jWdxG6tmLGsmm3CRsCrBqB0rr6xAFJxPg/iUvpoU5EQgfXXgN0DHY6iFrSWqa5fSEt1ljyI3MDc6YgvEsBYXGA1uOZ104UtHySsqWSrEVVQlWExSz4j6duCY7VfxqumCyb1Mcakak2Nxqv21iaCU2+HaZ05usQ0auSWEj7ndMSS4hQUuW7tMKZPKWWN6ynjxLhOsEW62OYsTU9hUqo1V4dPyb6lWiIR6cV1FWNG2yOa8fouqR5LnJjz0qOY2hqsUqfIGJ1jbWwqpwGYTV8x4KtKnTSlZx4lLhJfEFGITZuiqzTZbONRO3wpWXBttrBzGrLaFFeAaMpVyrLZc68h7Hd6Q3IJQgtsI3c7NWvQ2deLDJANFwcnQtWFk9LzNxq7UNqX/Cz/PLclnWaw5MIvpVpsQnGX2A9za2Fsu42MkJuRmwPHM4DIQjKLBlbrxM4ckSypWkgo+RlasxAKw1cameWuE5wNcq56fNLEElRbCjKd2AYgkTm5xjptH0vEbMwcF52uD800vMJM0Kw2OEq6SAavKIrUk0heRj2Rh05XFxX24SdgYSzNlW6i48k5+ElfXGfoyvQE9ZbzRwyRxVBpcdfLLqDJRK8QJLSm9JFaVScK8jY5xmzBpmJHERuxSMVatA76dp7Z+seHAqp9WBF+Xn2xjoRVTd0lwsE7VCLmSVCk4ww14znnlLaOJgqfUZRYGu1mILfRQUCD3Uk7vXPaboE05Xjp3XzpGbfYptSrlPuFpJ3vz4877bixh/ILgKJRk1fDJPM0yu03OE9oiUFCRGjTrx4mFlgSUIrhx2MOS/Q4FpVpxLZ6vsHhtlj3FpebHcuY3aivOygWFr2Z0ZG6MX9hVxpKR0pRJZnCYCvBGE5WVJiwPh5J8gLHODpsQgmqNiFFLUG4qy9k12Tp8VCAFEkezZ6lRGpjAO1PXPLduHNAtxJ7vXRDcnPiZp1SxSJZSajRFCgULOSB/AtUZ+wYbXoGhelHcmppSkrww2bToE0iVn4xBClmekhN7D3/hrpfkS+BduEE8jwMfXEz3Nu6hwGE0Mp4yNnI/2tSkAlIDKE9JMZxJA4TgpoQFS03YbISREOt1mzaRSesSkaTNpbEqGZIv2zmKVqzIrUtNeQGSGcrfcqleChy35k5PMaPgPaMaEZ/Ntni9mLPAmJspRsfGisH7sWZZFG50FhnG7nITk+8JxJvlJq/81pSZzVNILhcdudFu1obYtiF4mPRSrlLccJR5ypzBVQeKlClS0iItL2lkBaVBaGUYrDG6+r5G3ELCq3UGRTGtf6RAwjXQMhOICwlIhypXypUM22x9KKH+0b0+5g3uKSOdsipJWTPjXIuZyDOiJPQYmbOqBEPEorrljHmUeOtGy5gwcHYwZtxUgXUri3QUVpMGQeO0OX/zctxo0nb2QQQlFra4T13TG8NTMu3ook3kB7Tu6E6kX69sT9xEyqozw/rlz+W7ub5aC4ODZ61JbgtddlOeMoMhpHCjMqG0wI217TAHN84VNuj6jPvlA0NZXKo9ZeSbKmXQMI2pNtHIV6IEtSTNed/YygwTWjOByM3LpFEYu3qxjL0x5Sog34czJxRzb+lwm0tdTGrSULdth637XUXcZNK/wA2T3u3N3kCekm8yT2kZHKSwrJq0tiYfXhahlkwrZWeTFdEE034vZ5vNU5jGmS7RHltt/HKZvqDASZqOK3CeIjfdeLFpW+dic4LbjOK2vdPOqXojeEqqDC5smEZKjZgR2KCczHm9yK+bRpoQyY0Z29y4jmtRzQ2nOsEFpAyMUpPvN+60c46fFwbZDmzccoGrsBB6aV8fObDFWZ4Snb2YUg8iHK8OvNSqs0AcJOViJvQYRc1WRCVbf0GDksE78wBmdpbkcltkXwrPGqUNy3Qhuelaq9/O3liipCREc56cNuWDgMP9GTNxifVXddOYkRbmJm4j4U1CNQwqT/cqp+fHc5JJk4Cy9vYmEnX5IT7YqdlQ3DRuIKEcwpoLbhxvs0pRMzamxfMgTbKDgBP+xmBQUZpLg6txlJzynLlVKWmTL8BioPUOGopWC7Nu/GZs8ywPsIVrBMmAtfxEtl93HdnfvlG1slZRVb1NeUk/SIfo2hsEXGx5StlbAqIxylK6+lwgFFmcK1/YVG98K3EYW4ibTcXiNi8EZ3gbbA86MwoWK24Lk620yQSEeIx9naoOcsJxCHCLlIeRMQ5MW5k0uJrMMp7H6g1+UFsnoroWE/l/VAWcxASrJPO7YdwwiZTn/aQ6paJNMCuw1Re7FhI9aBeuX+/eQhILRnvJeKhzO94gBmd7SrkbqQyuukpJreSb1wYjDbf6RYwEkfTMKUuLEdbBLWtXliEO/ETKqYmptWbLqeHGUirB1dTQ88m61pInJG7Dg0stTyniNJcSIDJusxykY2NLrOE0Y2DCVsXNygIlGHj2SmCc1q5nYbVetMk3HMXGU8Z2nSZIWVOVBmyMyTOZsjbg2odQJQYvqBJhlwPHLU/py+hBsdpVtfxT1FZRPuerke2R8b41e0IQQ1MrGEalRybklr0PK6twctEz3i7LRf3a5CNQaQAcK6dKGefPsFYVuAKjJZPhmi0HACfuJ4pyrioGN1ZpcOLmhblFTbako4nCEYUVAj/jlpdG9fouEdEMv5O9Cihd4FtB4MADUKMmlcgUZZ+rS6g/e6wBHKdWIXbQEyCDgDMrPpyDRdGESoObl19qmVu0aWqTpApHVNGwAsrOhFDGkrBZfqKq44obK6SKEX4Ep1bayKuukpCFp+QFt7114/apuV8/IFf3ZCEo82aekmkTFOGOl8+fBsbc4NW0fqM61dqkwuEyzY2rIkxoLlhzuJ5jWI2KrTwqj8ArJfoykV+V7evAbJ0JoHzu631gWlOJxhwgEu508GeXng6O254S+20SFeFYWVzhAlcvjpoqs7r8JIJSse2cGm5pXtPWasoabuQP+VZ8n6mMVqX7sIkDnxl6xDorplQRaEVS0Z3ExzO3gcB5Cly0SQAWBCBhcEn+y6IqiXAjYKN9YNJ81WpPOTfcqPqzlajzmiAcSm4FIjrEJWhxXl0yIGzsD08VeXK2pb+k73Hpj62QTZmJbuJdw7c2nw6OscxTKoPzypJSuA2ObjLytejgTQUHEzgL0jydo4FHZumnJv0WMqbS6SrSwgPyylQxwqaD2GqBYWWBga+Li7IwNXVwwS5AXPJrgdLMCpMJIdcHTnhvmJZIziaV5eUIjI8WMlecpMhf+FFTAdKAw5dFYb5Bm8pFntkbynydFVZt6FDpEcQ7Fqw6VZRrTFucWFA5cHROGF4gqnhEDjwIRXsbwQ6fY0TiJBVCM9ZlFbIY5XzjyeAYKhHkFuFaVcl3br51EgBBQhtcQpvTHz8qC/w00dwWmV40c1f5pMm4SLqUKmpwQaSL3qlVXNDmBoUyWqFWF2YnUNxg6CO7uV6mI55v9AYJcRKcWKspdAYIRlFgPYWJcqkmI5gUdFu4fhufGJNKjR8F+YdbagpZqMmVxlhV8iXfUZH7altFE2OqTy2yO935H4TLwCyyt0VNXu9trC3haOODFpF/B2porOPEA7hKX4KLdnjLFC0wd/e4/pAbl64F68+8eduMSwtNcjTlIslZD5dSFS5aVWABxxwZBVqogaXSluTaUOo0Mr/Pgnm/sZy6+ohelRa7SHZjgJsc77yVd7KnTCI9VIhDg7MKuSJzRQiRxykPlHE6WndVjpHzuDE6LfiYOSUV4EpPvBSyBNMA2MZJKxeHCo1yB5FxKVUo1rP4ApqxlBFWNFbYxSCGC9NmpzYCRjy97w3lKSHjhseM0DksuaxiHqOalBOeJDiRyDh2R85c2BIXxAupJp8qcIVn5FElJ+tOrDG9iao+Q8VPkX/E+HTM2DNxudnjIeIwyrHD0hhl1wsusTwl6PsEQZpqFziScBfJCV8Yyj533FMipWAW4pgW9bygQDJwBW3CEpk0l95RzDiyY89YOAjx1XEgrQj9O3U/NREfs5hjJ4CnIx4pPhEcnDjNPGUsDC6B5Nsc19Godtjtzbh6aeDqipL8M2nOmfyL8vmzOnAQWaOqcon1ThnizBJKKZa1hKz3fPQSUk61eQp2Cq409jxf5wboMP14vGdmeKd6ysCEOKAxVwan6udUc/OxpUNbp9fiPLycda6FA8O3VjwDj8k80rZOU+WKZFyt0z+JjGlZnoVlVzVk16CYnnk7f0eTRDWCiqxARrn6Nu7Lg5tbIS6hjEnPmVBV/lWkdlBzyMKhnzgfk5xoA0tlSwpOaGVWRLFD02SRJguQCLz6rctyGNU1SRmSBbagy8O4mEzUwUXC08OkoxWrIr1KcDHxdzrEkVjtC5gjglz9o5ANTNb0lWlStyVzvGaQgE7gkiKv3PePVQk0A4eP3ItkTbh+xaucML/7Bk096O9EKp2QDo0GFEWY7lqDzF0mEt5YGcFp4CjlVoibi8ACqGQuwDJuIK+oUJT4x12rbjYuhQLcNYjySPao15SQ9Xpg+r1YFo2aH+U0J35UMFStM5JAeoz21mJ2PiJ8hhf2fWHbzWYsZ+mdaHAmxEFmJsuUMvcSsUWB8nHZJybcLdpUE5Rf9YIAsUX1D+fFlpcMHJ1Tle81H6TH3e+qPQOKZWLaqdM40TsfkMuynEX7I/2K4GngshC383GZeYIVHsWHk2aKGxbMxWzudChsdSdK14iFsNtFjc9AZzTIwIlFkfgqbWzsFuZE5dtlb5hS1s1MEr3zEVr7PguK4EKesqsDB2cudIgDJZmCN8Q8KBXrWXFLEjyFloTZ69oJVupJaqEfNFUuUNfv5L6sKlKprJs3OwuvpcJ1pgJMZSRo42k+hlZ2cFwenFi1u6zehWVKGcKk7WEegCc9dbzbtZ8n6ALBn3yAclWjDGUymfR0tUMKmYS2KvmcDI5mbpLlnqGe6v2N67M4rv0fpADgmaQ0YcTkbzKDZpn9dajfpVlzh/spMchAFi8ahEzeWajQfFoMmussoLRfFyuVeYUWlyi7QiIiViSy8CW8XBLtMuUPT6OT3ESA6xQ8KOe8jbRb6MJapIQMdxepZILu89NUHzc7jYUkR6WJWPukVwYOHhCZhTjYat6hL0x16Nuhm2Ca7y4c7fd+MeGGD5FCJmnjLEK54E5pUqWJyQJKDQ+4nyw3OK4OHImXO1PvEtlLCFqEMr0pjjk5uA+FdxeM9wPb0PYoHGUIfTtt+rx1duKlJzgymmZV86JDpBQ7OmC7j10buKxQCbEsVgY3hyQBF/9KKH+x2rRZ7kb9YXTOhEvGH/Gc01bf3TNlg/73r7l5pUfC6oWBzWzXB86EuCVl6B8VK0S1k5MSnIUbFi2VGG0VPFXYDfqLykRVvlGWFD41hWZuZYzXJ05oqj3l7gXMb7UD55jq7G7n8YAHnpQpu503SpdaPnFuXaSCc4Y7LAf0Xk1zubErhWlaX3z3xnk+80mqMtbGhAsXPOUcdqHBVeI/LP2lUpfA7aK/Fl2dQIiF1rfHmFk7xElZtMR+ttt1bXkcJXONZcVTypc7rHth6VmS2+12+gXB6PbW8btrcD39mFKluNM4ry3L4F7w1f0oEiUvJsRxzMV1GKN04a12JrHa7ZYBidPrAifDc08/lpqd/fy5LW2NLDO4sSLEMODEt6PC4CLdviwUQuKFOzmiMF8Lugpwqa2fuusgkwZU/oSm1UEVJYReHzgd4kSCRhNhYsvsN4XgPwLo3cBf0L6q+GaH514enCbM0wu26s4oNZtduyvcSIWeDR3BErA+5Gd5E1oqOl7NSAnvbw/Q9L5TbrAyt+ZmzySK+Fhrtj84EZS19PBTBtJkWVDFNMFxddgybRKm3VtCGI0Nt8rUmmWOcuel19csNNfpN0p92NB5SRm5jaFKBzu/uz1AF73mVlk95pajDPkVdnlBnxBqD3CRJU953UPXdrr3FSQks7fK2hqzHaU33o8j9QbHGF0BtB2EOILShNJbA9dZq2cdUHVvzba6MEukVwcOEjc1hJgUCffOG/+3twbjJnfuO4Nb0EQSr20xzOq3kHvTK2xBx7qWHB5s3IC0vBWDM0eMAtLpwVpMc9vV9dBDC/5u7Nz7VIt7ycAlWF+e3wi3zJ11i8pQENHc6vraExPgRt4N6QuO8XSpuK2k8QU0uRVwesMwSrrZGzHc5nUrIuPmc3qNP27L0cpUiGOQxDFObwecJBB2SV/YnGR60pEhYd2djJoceb29jdEmLxT+8+VmcgHTDrrzO2TfVMuOekVjCROwynEdkHeCt9HgMNrNCbsZcJSFnfNvN7cEtpKzADdy4Ohvcct3BS5Jlugvb4WbdPO4G9VePjDwMHojpDHH0P3a9CrBsTTQ4FboNF8ovxlwiYbw0hoc1ax9XnPQ0TRrSx88Hztw9ARHjTZ5X1JAyG8nxJnWivbgTP/Tsu44CDWlMGydGj+l9fp6m7lylO8vfCXopbfDzYi/1plWqs5vQnGvzt6yFtPdcnGGuNHb4l50iJvPUaDw2wKniuMtz3dLE61PvDm1uQUDPeh8FHBMhbj3FRf/VbsSr3Gkcl8jar2dwSlf7eT2Vc1DtpOFxS0+S+nP62lwXINbxvA/bHE7BocBC8G12/+mTPaP7pa8WnJwsYwzbvw8Mq0vuCzEvezO0ew64GAwz13Aya1+7KivEanAbae4nSlo9APHDLhdgJ4yvaEQx7j28y07TsAP7mprIbHwPoob7EmeK2b0A8e1NnlfBaApR083B87jZNVn1Qrcgs7RPv3KnRw6VxleBHBfyNlifV9XaUKcIPh+U5pSauLVO+iqNuAYWeI2/7yqrwge9CaFyw7FCz+bRvP63TjV4F6W7+/inuhNgYPt+5flahm34jZXFVlWqXM8RIZovXM6np7gMm2yeheeck5ubIgvzAPe5mfT53LDeFV1pJlik1SkgwbhZ2yzPw3c+2oJnpLeHLj2j9xNCG4Yv5RLQ4yTRG8mC1mSnLflphe4JNMm6CkJvTlwJG33EBrxomW1jklSMl8Zbi/nPh7R0+LM1gB6Sk5+2iFStxVosJSXHj+bmKab95VHzr3/3wccZelKg9vdnqbsWmZZojTJRwMR8PS+VnR+N9kX3EKEuHez2nbJLXrK1iNGcPk2E4rR7V1PwMslTpH1sjgyN9wg+2Y/MTelKj2jv1J47j5/yaLbMiCX2ETuA45nezroKX9mg1MK+gWfYyOgwdmjOMOG5naRLNbrtQiXlqec/9zgRGCAaiwn87ncHEheMi/5vpxf6tBmD3CUUgvcMkl/bnCydLLEKMYDbyl0tF6zy5fLnbXtAY7TZPVueUpOfu4hd/tXy5eX5XJlVBlgi8n8YjffA1witIn5+u/znx9cgttA7zB2FrY5uWTFqI/FWdoEnDz7ycERRulLlv8Awt1yLlxnfMk77wFungM35G9bXy05EeeW0uTEWIGxkTPu4AwEjppGIVh7L7e3M9BjwOH2uQhxYrwgNUovvVy7g4MGbgNu9bMnA2a5WvbFkyu45x4WZ2uTJUt+DXAC11wNfhWxoTs42NN5z5KBOfl1xjU9neAkcJAM/Ergrml4PVadSUNvsNvkFwZHEmhXwGwUkoFPcDcDbr4y4F5uqYP5Fwe3QFGpctFPcLdkcS+K2i+wpfMzgeMENjZU8Yd/grsdi4tBVGpt8sntVsClljZZfYK7HXA00ya71csnuBsCp7UJikr+OYO3CO4X2ET9acCBqNxl4NLPGbwRcIwsjcGtPrPvmwFHCdVZnBCVn47yZsAxEJWm9yL9FJW3Ao7b4D5F5e2ASz6zgdsEN/8E9xOAm5PF5wTeJrhPWXmL4Faf4G4UXPJZY75FcKvl5zbqjYJL2Se4WwFnbQ587sbdEji75PUJ7obApSlZfYK7QXD4qMedTuM+t3VuB1xKEtVzspp/VrxuCJx8uiqMJaOf+983BC5V5D43dW4MHJ7XgePQyecJq0uO/wfImhyWKsfVxAAAAABJRU5ErkJggg==";
const ENG="\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}";
const SCO="\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}";
const FLAGS={
  "AEK Athens":"🇬🇷","Olympiacos":"🇬🇷","OFI Crete":"🇬🇷",
  "LASK":"🇦🇹","Salzburg":"🇦🇹","Sturm Graz":"🇦🇹",
  "Club Brugge":"🇧🇪","Anderlecht":"🇧🇪","Union SG":"🇧🇪",
  "Aston Villa":ENG,"Manchester City":ENG,"Liverpool":ENG,"Arsenal":ENG,"Manchester United":ENG,
  "Crystal Palace":ENG,"Bournemouth":ENG,"Sunderland":ENG,
  "Celtic":SCO,
  "Borussia Dortmund":"🇩🇪","Stuttgart":"🇩🇪","Leipzig":"🇩🇪","Bayern Munchen":"🇩🇪","Leverkusen":"🇩🇪","Hoffenheim":"🇩🇪",
  "Villarreal":"🇪🇸","Real Betis":"🇪🇸","Real Madrid":"🇪🇸","Barcelona":"🇪🇸","Atletico Madrid":"🇪🇸","Celta":"🇪🇸","Real Sociedad":"🇪🇸",
  "Porto":"🇵🇹","Sporting CP":"🇵🇹","Benfica":"🇵🇹","Torreense":"🇵🇹",
  "Lille":"🇫🇷","Paris Saint-Germain":"🇫🇷","Lens":"🇫🇷","Lyon":"🇫🇷","Marseille":"🇫🇷","Rennes":"🇫🇷",
  "Inter":"🇮🇹","Napoli":"🇮🇹","Roma":"🇮🇹","Como":"🇮🇹","Milan":"🇮🇹","Juventus":"🇮🇹",
  "Feyenoord":"🇳🇱","PSV Eindhoven":"🇳🇱","AZ Alkmaar":"🇳🇱","N.E.C.":"🇳🇱",
  "Viking":"🇳🇴","Bodo/Glimt":"🇳🇴","Lillestrom":"🇳🇴",
  "Slovan Bratislava":"🇸🇰","Galatasaray":"🇹🇷","Fenerbahce":"🇹🇷","Besiktas":"🇹🇷",
  "Shakhtar Donetsk":"🇺🇦","Sabah":"🇦🇿","Slavia Praha":"🇨🇿","Sparta Praha":"🇨🇿","Viktoria Plzen":"🇨🇿",
  "Ararat-Armenia":"🇦🇲","Omonia":"🇨🇾","Celje":"🇸🇮","H. Beer-Sheva":"🇮🇱","GNK Dinamo":"🇭🇷",
  "Jagiellonia":"🇵🇱","Lech Poznan":"🇵🇱","Levski Sofia":"🇧🇬","Ferencvaros":"🇭🇺",
};
const F=t=>FLAGS[t]||"⚽";

// Χρωμα-υπογραφη καθε ομαδας (για διακριτικη πινελια στις καρτες)
const TEAM_COLOR={
"AEK Athens":"#f5d20c","LASK":"#000000","Club Brugge":"#0033a0","Aston Villa":"#95bfe5",
"Borussia Dortmund":"#fde100","Villarreal":"#ffe667","Porto":"#0033a0","Manchester City":"#6cabdd",
"Lille":"#d3122a","Real Betis":"#00954c","Real Madrid":"#febe10","Inter":"#0068a8",
"Barcelona":"#a50044","Feyenoord":"#e30613","Stuttgart":"#e32219","Viking":"#003d7c",
"Liverpool":"#c8102e","Atletico Madrid":"#cb3524","Paris Saint-Germain":"#004170","Slovan Bratislava":"#0b3d91",
"Sporting CP":"#008057","Galatasaray":"#f5b02e","Napoli":"#12a0d7","Arsenal":"#ef0107",
"Fenerbahce":"#ffed00","Roma":"#8e1f2f","PSV Eindhoven":"#ed1c24","Shakhtar Donetsk":"#f36f21",
"Como":"#0b4ea2","Leipzig":"#dd0741","Bayern Munchen":"#dc052d","Bodo/Glimt":"#ffd200",
"Manchester United":"#da291c","Sabah":"#00a0e3","Slavia Praha":"#d7141a","Lens":"#ffe500",
"Ararat-Armenia":"#d90429","Sparta Praha":"#8b1a2b","Omonia":"#00a650","Celta":"#8ac3ee",
"Milan":"#fb090b","Benfica":"#e42518","Leverkusen":"#e32221","Celje":"#f9e300",
"H. Beer-Sheva":"#e4002b","GNK Dinamo":"#0d5eaf","Olympiacos":"#d0021b","Jagiellonia":"#e30613",
"Anderlecht":"#672d91","Lyon":"#1e2f5e","Sturm Graz":"#000000","Rennes":"#e2231a",
"Sunderland":"#eb172b","AZ Alkmaar":"#e2001a","OFI Crete":"#000000","Hoffenheim":"#1961b5",
"Levski Sofia":"#0057b8","Salzburg":"#c8102e","Besiktas":"#000000","Marseille":"#2faee0",
"Celtic":"#018749","Ferencvaros":"#009543","Crystal Palace":"#1b458f","Lech Poznan":"#0057b8",
"Viktoria Plzen":"#e30613","Union SG":"#f7d417","Juventus":"#000000","N.E.C.":"#e30613",
"Lillestrom":"#f8ec31","Torreense":"#009a44","Real Sociedad":"#0067b1","Bournemouth":"#da291c",
};
const TC=t=>TEAM_COLOR[t]||"#8892a8";

// Συντομα ονοματα για τις καρτες (οπως στις αθλητικες εφαρμογες)
const SHORT={
"Borussia Dortmund":"Dortmund","Manchester City":"Man City","Manchester United":"Man United",
"Paris Saint-Germain":"PSG","Atletico Madrid":"Atletico","Bayern Munchen":"Bayern",
"Shakhtar Donetsk":"Shakhtar","Slovan Bratislava":"Slovan","PSV Eindhoven":"PSV",
"Crystal Palace":"Palace","Sporting CP":"Sporting","Viktoria Plzen":"Plzen",
"Ararat-Armenia":"Ararat","H. Beer-Sheva":"Beer-Sheva","GNK Dinamo":"Dinamo",
"Levski Sofia":"Levski","Lech Poznan":"Lech","Sparta Praha":"Sparta","Slavia Praha":"Slavia",
"Sturm Graz":"Sturm","AZ Alkmaar":"AZ","Real Sociedad":"Sociedad",
"AEK Athens":"AEK","Club Brugge":"Brugge","Real Betis":"Betis","Bodo/Glimt":"Bodo",
"Ararat-Armenia":"Ararat","Union SG":"Union","Levski Sofia":"Levski","OFI Crete":"OFI",
};
const SN=t=>SHORT[t]||t;


function noAccent(s){return s.replace(/[άΆ]/g,"Α").replace(/[έΈ]/g,"Ε").replace(/[ήΉ]/g,"Η").replace(/[ίΊϊΪ]/g,"Ι").replace(/[όΌ]/g,"Ο").replace(/[ύΎϋΫ]/g,"Υ").replace(/[ώΏ]/g,"Ω");}
const caps=s=>noAccent(s).toUpperCase();

const COMPS={
  UCL:{key:"UCL",name:"Champions League",short:"Champions",icon:"⭐"},
  UEL:{key:"UEL",name:"Europa League",short:"Europa",icon:"🔶"},
};

const SCHEDULE = [
  {id:"ucl001",comp:"UCL",date:"2026-09-08",gtime:"19:45",home:"AEK Athens", away:"LASK"},
  {id:"ucl002",comp:"UCL",date:"2026-09-08",gtime:"19:45",home:"Club Brugge", away:"Aston Villa"},
  {id:"ucl003",comp:"UCL",date:"2026-09-08",gtime:"22:00",home:"Borussia Dortmund", away:"Villarreal"},
  {id:"ucl004",comp:"UCL",date:"2026-09-08",gtime:"22:00",home:"Porto", away:"Manchester City"},
  {id:"ucl005",comp:"UCL",date:"2026-09-08",gtime:"22:00",home:"Lille", away:"Real Betis"},
  {id:"ucl006",comp:"UCL",date:"2026-09-08",gtime:"22:00",home:"Real Madrid", away:"Inter"},
  {id:"ucl007",comp:"UCL",date:"2026-09-09",gtime:"19:45",home:"Barcelona", away:"Feyenoord"},
  {id:"ucl008",comp:"UCL",date:"2026-09-09",gtime:"19:45",home:"Stuttgart", away:"Viking"},
  {id:"ucl009",comp:"UCL",date:"2026-09-09",gtime:"22:00",home:"Liverpool", away:"Atletico Madrid"},
  {id:"ucl010",comp:"UCL",date:"2026-09-09",gtime:"22:00",home:"Paris Saint-Germain", away:"Slovan Bratislava"},
  {id:"ucl011",comp:"UCL",date:"2026-09-09",gtime:"22:00",home:"Sporting CP", away:"Galatasaray"},
  {id:"ucl012",comp:"UCL",date:"2026-09-09",gtime:"22:00",home:"Napoli", away:"Arsenal"},
  {id:"ucl013",comp:"UCL",date:"2026-09-10",gtime:"19:45",home:"Fenerbahce", away:"Roma"},
  {id:"ucl014",comp:"UCL",date:"2026-09-10",gtime:"19:45",home:"PSV Eindhoven", away:"Shakhtar Donetsk"},
  {id:"ucl015",comp:"UCL",date:"2026-09-10",gtime:"22:00",home:"Como", away:"Leipzig"},
  {id:"ucl016",comp:"UCL",date:"2026-09-10",gtime:"22:00",home:"Bayern Munchen", away:"Bodo/Glimt"},
  {id:"ucl017",comp:"UCL",date:"2026-09-10",gtime:"22:00",home:"Manchester United", away:"Sabah"},
  {id:"ucl018",comp:"UCL",date:"2026-09-10",gtime:"22:00",home:"Slavia Praha", away:"Lens"},
  {id:"ucl019",comp:"UCL",date:"2026-10-13",gtime:"19:45",home:"Lens", away:"Sporting CP"},
  {id:"ucl020",comp:"UCL",date:"2026-10-13",gtime:"19:45",home:"Sabah", away:"Slavia Praha"},
  {id:"ucl021",comp:"UCL",date:"2026-10-13",gtime:"22:00",home:"Arsenal", away:"Lille"},
  {id:"ucl022",comp:"UCL",date:"2026-10-13",gtime:"22:00",home:"Atletico Madrid", away:"Manchester United"},
  {id:"ucl023",comp:"UCL",date:"2026-10-13",gtime:"22:00",home:"Inter", away:"Club Brugge"},
  {id:"ucl024",comp:"UCL",date:"2026-10-13",gtime:"22:00",home:"Galatasaray", away:"Barcelona"},
  {id:"ucl025",comp:"UCL",date:"2026-10-13",gtime:"22:00",home:"Leipzig", away:"PSV Eindhoven"},
  {id:"ucl026",comp:"UCL",date:"2026-10-13",gtime:"22:00",home:"Viking", away:"Bayern Munchen"},
  {id:"ucl027",comp:"UCL",date:"2026-10-13",gtime:"22:00",home:"Villarreal", away:"Napoli"},
  {id:"ucl028",comp:"UCL",date:"2026-10-14",gtime:"19:45",home:"Feyenoord", away:"Como"},
  {id:"ucl029",comp:"UCL",date:"2026-10-14",gtime:"19:45",home:"LASK", away:"Liverpool"},
  {id:"ucl030",comp:"UCL",date:"2026-10-14",gtime:"22:00",home:"Roma", away:"Real Madrid"},
  {id:"ucl031",comp:"UCL",date:"2026-10-14",gtime:"22:00",home:"Aston Villa", away:"Fenerbahce"},
  {id:"ucl032",comp:"UCL",date:"2026-10-14",gtime:"22:00",home:"Shakhtar Donetsk", away:"AEK Athens"},
  {id:"ucl033",comp:"UCL",date:"2026-10-14",gtime:"22:00",home:"Bodo/Glimt", away:"Borussia Dortmund"},
  {id:"ucl034",comp:"UCL",date:"2026-10-14",gtime:"22:00",home:"Manchester City", away:"Paris Saint-Germain"},
  {id:"ucl035",comp:"UCL",date:"2026-10-14",gtime:"22:00",home:"Real Betis", away:"Porto"},
  {id:"ucl036",comp:"UCL",date:"2026-10-14",gtime:"22:00",home:"Slovan Bratislava", away:"Stuttgart"},
  {id:"ucl037",comp:"UCL",date:"2026-10-20",gtime:"19:45",home:"Fenerbahce", away:"Slavia Praha"},
  {id:"ucl038",comp:"UCL",date:"2026-10-20",gtime:"19:45",home:"Sabah", away:"Borussia Dortmund"},
  {id:"ucl039",comp:"UCL",date:"2026-10-20",gtime:"22:00",home:"Roma", away:"Slovan Bratislava"},
  {id:"ucl040",comp:"UCL",date:"2026-10-20",gtime:"22:00",home:"Porto", away:"PSV Eindhoven"},
  {id:"ucl041",comp:"UCL",date:"2026-10-20",gtime:"22:00",home:"Liverpool", away:"Villarreal"},
  {id:"ucl042",comp:"UCL",date:"2026-10-20",gtime:"22:00",home:"Manchester City", away:"AEK Athens"},
  {id:"ucl043",comp:"UCL",date:"2026-10-20",gtime:"22:00",home:"Paris Saint-Germain", away:"Barcelona"},
  {id:"ucl044",comp:"UCL",date:"2026-10-20",gtime:"22:00",home:"Napoli", away:"Bodo/Glimt"},
  {id:"ucl045",comp:"UCL",date:"2026-10-20",gtime:"22:00",home:"Stuttgart", away:"Atletico Madrid"},
  {id:"ucl046",comp:"UCL",date:"2026-10-21",gtime:"19:45",home:"Como", away:"Manchester United"},
  {id:"ucl047",comp:"UCL",date:"2026-10-21",gtime:"19:45",home:"Lille", away:"Galatasaray"},
  {id:"ucl048",comp:"UCL",date:"2026-10-21",gtime:"22:00",home:"Aston Villa", away:"Viking"},
  {id:"ucl049",comp:"UCL",date:"2026-10-21",gtime:"22:00",home:"Club Brugge", away:"Lens"},
  {id:"ucl050",comp:"UCL",date:"2026-10-21",gtime:"22:00",home:"Bayern Munchen", away:"Arsenal"},
  {id:"ucl051",comp:"UCL",date:"2026-10-21",gtime:"22:00",home:"Inter", away:"Shakhtar Donetsk"},
  {id:"ucl052",comp:"UCL",date:"2026-10-21",gtime:"22:00",home:"Real Madrid", away:"Leipzig"},
  {id:"ucl053",comp:"UCL",date:"2026-10-21",gtime:"22:00",home:"Real Betis", away:"Feyenoord"},
  {id:"ucl054",comp:"UCL",date:"2026-10-21",gtime:"22:00",home:"Sporting CP", away:"LASK"},
  {id:"ucl055",comp:"UCL",date:"2026-11-03",gtime:"19:45",home:"Shakhtar Donetsk", away:"Sporting CP"},
  {id:"ucl056",comp:"UCL",date:"2026-11-03",gtime:"19:45",home:"Galatasaray", away:"Stuttgart"},
  {id:"ucl057",comp:"UCL",date:"2026-11-03",gtime:"22:00",home:"Atletico Madrid", away:"Bayern Munchen"},
  {id:"ucl058",comp:"UCL",date:"2026-11-03",gtime:"22:00",home:"Barcelona", away:"Aston Villa"},
  {id:"ucl059",comp:"UCL",date:"2026-11-03",gtime:"22:00",home:"Feyenoord", away:"Inter"},
  {id:"ucl060",comp:"UCL",date:"2026-11-03",gtime:"22:00",home:"Bodo/Glimt", away:"Lille"},
  {id:"ucl061",comp:"UCL",date:"2026-11-03",gtime:"22:00",home:"LASK", away:"Slovan Bratislava"},
  {id:"ucl062",comp:"UCL",date:"2026-11-03",gtime:"22:00",home:"Manchester United", away:"Roma"},
  {id:"ucl063",comp:"UCL",date:"2026-11-03",gtime:"22:00",home:"Villarreal", away:"Paris Saint-Germain"},
  {id:"ucl064",comp:"UCL",date:"2026-11-04",gtime:"19:45",home:"AEK Athens", away:"Real Madrid"},
  {id:"ucl065",comp:"UCL",date:"2026-11-04",gtime:"19:45",home:"Fenerbahce", away:"Liverpool"},
  {id:"ucl066",comp:"UCL",date:"2026-11-04",gtime:"22:00",home:"Borussia Dortmund", away:"Real Betis"},
  {id:"ucl067",comp:"UCL",date:"2026-11-04",gtime:"22:00",home:"Porto", away:"Napoli"},
  {id:"ucl068",comp:"UCL",date:"2026-11-04",gtime:"22:00",home:"PSV Eindhoven", away:"Club Brugge"},
  {id:"ucl069",comp:"UCL",date:"2026-11-04",gtime:"22:00",home:"Leipzig", away:"Manchester City"},
  {id:"ucl070",comp:"UCL",date:"2026-11-04",gtime:"22:00",home:"Lens", away:"Como"},
  {id:"ucl071",comp:"UCL",date:"2026-11-04",gtime:"22:00",home:"Slavia Praha", away:"Arsenal"},
  {id:"ucl072",comp:"UCL",date:"2026-11-04",gtime:"22:00",home:"Viking", away:"Sabah"},
  {id:"ucl073",comp:"UCL",date:"2026-11-24",gtime:"19:45",home:"Bodo/Glimt", away:"LASK"},
  {id:"ucl074",comp:"UCL",date:"2026-11-24",gtime:"19:45",home:"Galatasaray", away:"Aston Villa"},
  {id:"ucl075",comp:"UCL",date:"2026-11-24",gtime:"22:00",home:"Arsenal", away:"Borussia Dortmund"},
  {id:"ucl076",comp:"UCL",date:"2026-11-24",gtime:"22:00",home:"Como", away:"AEK Athens"},
  {id:"ucl077",comp:"UCL",date:"2026-11-24",gtime:"22:00",home:"Feyenoord", away:"Porto"},
  {id:"ucl078",comp:"UCL",date:"2026-11-24",gtime:"22:00",home:"Manchester City", away:"Napoli"},
  {id:"ucl079",comp:"UCL",date:"2026-11-24",gtime:"22:00",home:"Leipzig", away:"Lens"},
  {id:"ucl080",comp:"UCL",date:"2026-11-24",gtime:"22:00",home:"Real Madrid", away:"PSV Eindhoven"},
  {id:"ucl081",comp:"UCL",date:"2026-11-24",gtime:"22:00",home:"Slovan Bratislava", away:"Real Betis"},
  {id:"ucl082",comp:"UCL",date:"2026-11-25",gtime:"19:45",home:"Sabah", away:"Barcelona"},
  {id:"ucl083",comp:"UCL",date:"2026-11-25",gtime:"19:45",home:"Slavia Praha", away:"Villarreal"},
  {id:"ucl084",comp:"UCL",date:"2026-11-25",gtime:"22:00",home:"Atletico Madrid", away:"Viking"},
  {id:"ucl085",comp:"UCL",date:"2026-11-25",gtime:"22:00",home:"Club Brugge", away:"Liverpool"},
  {id:"ucl086",comp:"UCL",date:"2026-11-25",gtime:"22:00",home:"Inter", away:"Stuttgart"},
  {id:"ucl087",comp:"UCL",date:"2026-11-25",gtime:"22:00",home:"Shakhtar Donetsk", away:"Fenerbahce"},
  {id:"ucl088",comp:"UCL",date:"2026-11-25",gtime:"22:00",home:"Lille", away:"Bayern Munchen"},
  {id:"ucl089",comp:"UCL",date:"2026-11-25",gtime:"22:00",home:"Paris Saint-Germain", away:"Roma"},
  {id:"ucl090",comp:"UCL",date:"2026-11-25",gtime:"22:00",home:"Sporting CP", away:"Manchester United"},
  {id:"ucl091",comp:"UCL",date:"2026-12-08",gtime:"19:45",home:"Viking", away:"Feyenoord"},
  {id:"ucl092",comp:"UCL",date:"2026-12-08",gtime:"19:45",home:"Villarreal", away:"Sabah"},
  {id:"ucl093",comp:"UCL",date:"2026-12-08",gtime:"22:00",home:"AEK Athens", away:"Galatasaray"},
  {id:"ucl094",comp:"UCL",date:"2026-12-08",gtime:"22:00",home:"Roma", away:"Sporting CP"},
  {id:"ucl095",comp:"UCL",date:"2026-12-08",gtime:"22:00",home:"Aston Villa", away:"Paris Saint-Germain"},
  {id:"ucl096",comp:"UCL",date:"2026-12-08",gtime:"22:00",home:"Barcelona", away:"Manchester City"},
  {id:"ucl097",comp:"UCL",date:"2026-12-08",gtime:"22:00",home:"Bayern Munchen", away:"Slavia Praha"},
  {id:"ucl098",comp:"UCL",date:"2026-12-08",gtime:"22:00",home:"Manchester United", away:"Leipzig"},
  {id:"ucl099",comp:"UCL",date:"2026-12-08",gtime:"22:00",home:"Napoli", away:"Club Brugge"},
  {id:"ucl100",comp:"UCL",date:"2026-12-09",gtime:"19:45",home:"Real Betis", away:"Como"},
  {id:"ucl101",comp:"UCL",date:"2026-12-09",gtime:"19:45",home:"Slovan Bratislava", away:"Shakhtar Donetsk"},
  {id:"ucl102",comp:"UCL",date:"2026-12-09",gtime:"22:00",home:"Arsenal", away:"Real Madrid"},
  {id:"ucl103",comp:"UCL",date:"2026-12-09",gtime:"22:00",home:"Borussia Dortmund", away:"Inter"},
  {id:"ucl104",comp:"UCL",date:"2026-12-09",gtime:"22:00",home:"LASK", away:"Fenerbahce"},
  {id:"ucl105",comp:"UCL",date:"2026-12-09",gtime:"22:00",home:"Liverpool", away:"Porto"},
  {id:"ucl106",comp:"UCL",date:"2026-12-09",gtime:"22:00",home:"PSV Eindhoven", away:"Atletico Madrid"},
  {id:"ucl107",comp:"UCL",date:"2026-12-09",gtime:"22:00",home:"Lens", away:"Bodo/Glimt"},
  {id:"ucl108",comp:"UCL",date:"2026-12-09",gtime:"22:00",home:"Stuttgart", away:"Lille"},
  {id:"ucl109",comp:"UCL",date:"2027-01-19",gtime:"19:45",home:"Bodo/Glimt", away:"Atletico Madrid"},
  {id:"ucl110",comp:"UCL",date:"2027-01-19",gtime:"19:45",home:"Galatasaray", away:"Feyenoord"},
  {id:"ucl111",comp:"UCL",date:"2027-01-19",gtime:"22:00",home:"AEK Athens", away:"Roma"},
  {id:"ucl112",comp:"UCL",date:"2027-01-19",gtime:"22:00",home:"Aston Villa", away:"Borussia Dortmund"},
  {id:"ucl113",comp:"UCL",date:"2027-01-19",gtime:"22:00",home:"Inter", away:"Liverpool"},
  {id:"ucl114",comp:"UCL",date:"2027-01-19",gtime:"22:00",home:"Porto", away:"Slavia Praha"},
  {id:"ucl115",comp:"UCL",date:"2027-01-19",gtime:"22:00",home:"Lille", away:"Slovan Bratislava"},
  {id:"ucl116",comp:"UCL",date:"2027-01-19",gtime:"22:00",home:"Real Madrid", away:"LASK"},
  {id:"ucl117",comp:"UCL",date:"2027-01-19",gtime:"22:00",home:"Stuttgart", away:"Club Brugge"},
  {id:"ucl118",comp:"UCL",date:"2027-01-20",gtime:"19:45",home:"Fenerbahce", away:"Villarreal"},
  {id:"ucl119",comp:"UCL",date:"2027-01-20",gtime:"19:45",home:"Sabah", away:"Napoli"},
  {id:"ucl120",comp:"UCL",date:"2027-01-20",gtime:"22:00",home:"Como", away:"Paris Saint-Germain"},
  {id:"ucl121",comp:"UCL",date:"2027-01-20",gtime:"22:00",home:"Manchester United", away:"Bayern Munchen"},
  {id:"ucl122",comp:"UCL",date:"2027-01-20",gtime:"22:00",home:"Leipzig", away:"Shakhtar Donetsk"},
  {id:"ucl123",comp:"UCL",date:"2027-01-20",gtime:"22:00",home:"Lens", away:"Manchester City"},
  {id:"ucl124",comp:"UCL",date:"2027-01-20",gtime:"22:00",home:"Real Betis", away:"Arsenal"},
  {id:"ucl125",comp:"UCL",date:"2027-01-20",gtime:"22:00",home:"Sporting CP", away:"Barcelona"},
  {id:"ucl126",comp:"UCL",date:"2027-01-20",gtime:"22:00",home:"Viking", away:"PSV Eindhoven"},
  {id:"ucl127",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Arsenal", away:"Sabah"},
  {id:"ucl128",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Roma", away:"Lille"},
  {id:"ucl129",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Atletico Madrid", away:"Fenerbahce"},
  {id:"ucl130",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Borussia Dortmund", away:"AEK Athens"},
  {id:"ucl131",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Club Brugge", away:"Bodo/Glimt"},
  {id:"ucl132",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Bayern Munchen", away:"Real Betis"},
  {id:"ucl133",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Barcelona", away:"Como"},
  {id:"ucl134",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Shakhtar Donetsk", away:"Real Madrid"},
  {id:"ucl135",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Feyenoord", away:"Leipzig"},
  {id:"ucl136",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"LASK", away:"Porto"},
  {id:"ucl137",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Liverpool", away:"Lens"},
  {id:"ucl138",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Manchester City", away:"Sporting CP"},
  {id:"ucl139",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Paris Saint-Germain", away:"Galatasaray"},
  {id:"ucl140",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"PSV Eindhoven", away:"Stuttgart"},
  {id:"ucl141",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Slavia Praha", away:"Aston Villa"},
  {id:"ucl142",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Napoli", away:"Viking"},
  {id:"ucl143",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Villarreal", away:"Manchester United"},
  {id:"ucl144",comp:"UCL",date:"2027-01-27",gtime:"22:00",home:"Slovan Bratislava", away:"Inter"},
  {id:"uel145",comp:"UEL",date:"2026-09-16",gtime:"19:45",home:"Ararat-Armenia", away:"Sparta Praha"},
  {id:"uel146",comp:"UEL",date:"2026-09-16",gtime:"19:45",home:"Omonia", away:"Celta"},
  {id:"uel147",comp:"UEL",date:"2026-09-16",gtime:"22:00",home:"Milan", away:"Benfica"},
  {id:"uel148",comp:"UEL",date:"2026-09-16",gtime:"22:00",home:"Leverkusen", away:"Celje"},
  {id:"uel149",comp:"UEL",date:"2026-09-16",gtime:"22:00",home:"H. Beer-Sheva", away:"GNK Dinamo"},
  {id:"uel150",comp:"UEL",date:"2026-09-16",gtime:"22:00",home:"Olympiacos", away:"Jagiellonia"},
  {id:"uel151",comp:"UEL",date:"2026-09-16",gtime:"22:00",home:"Anderlecht", away:"Lyon"},
  {id:"uel152",comp:"UEL",date:"2026-09-16",gtime:"22:00",home:"Sturm Graz", away:"Rennes"},
  {id:"uel153",comp:"UEL",date:"2026-09-16",gtime:"22:00",home:"Sunderland", away:"AZ Alkmaar"},
  {id:"uel154",comp:"UEL",date:"2026-09-17",gtime:"19:45",home:"OFI Crete", away:"Hoffenheim"},
  {id:"uel155",comp:"UEL",date:"2026-09-17",gtime:"19:45",home:"Levski Sofia", away:"Salzburg"},
  {id:"uel156",comp:"UEL",date:"2026-09-17",gtime:"22:00",home:"Besiktas", away:"Marseille"},
  {id:"uel157",comp:"UEL",date:"2026-09-17",gtime:"22:00",home:"Celtic", away:"Ferencvaros"},
  {id:"uel158",comp:"UEL",date:"2026-09-17",gtime:"22:00",home:"Crystal Palace", away:"Lech Poznan"},
  {id:"uel159",comp:"UEL",date:"2026-09-17",gtime:"22:00",home:"Viktoria Plzen", away:"Union SG"},
  {id:"uel160",comp:"UEL",date:"2026-09-17",gtime:"22:00",home:"Juventus", away:"N.E.C."},
  {id:"uel161",comp:"UEL",date:"2026-09-17",gtime:"22:00",home:"Lillestrom", away:"Torreense"},
  {id:"uel162",comp:"UEL",date:"2026-09-17",gtime:"22:00",home:"Real Sociedad", away:"Bournemouth"},
  {id:"uel163",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"Sparta Praha", away:"Lillestrom"},
  {id:"uel164",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"AZ Alkmaar", away:"H. Beer-Sheva"},
  {id:"uel165",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"Salzburg", away:"Milan"},
  {id:"uel166",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"Lech Poznan", away:"Leverkusen"},
  {id:"uel167",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"Celje", away:"Omonia"},
  {id:"uel168",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"Lyon", away:"Crystal Palace"},
  {id:"uel169",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"Union SG", away:"Real Sociedad"},
  {id:"uel170",comp:"UEL",date:"2026-10-15",gtime:"19:45",home:"Torreense", away:"Sunderland"},
  {id:"uel171",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Bournemouth", away:"Sturm Graz"},
  {id:"uel172",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Ferencvaros", away:"Viktoria Plzen"},
  {id:"uel173",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"GNK Dinamo", away:"Anderlecht"},
  {id:"uel174",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Jagiellonia", away:"Ararat-Armenia"},
  {id:"uel175",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"N.E.C.", away:"Levski Sofia"},
  {id:"uel176",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Marseille", away:"Olympiacos"},
  {id:"uel177",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Celta", away:"Juventus"},
  {id:"uel178",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Benfica", away:"Celtic"},
  {id:"uel179",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Rennes", away:"OFI Crete"},
  {id:"uel180",comp:"UEL",date:"2026-10-15",gtime:"22:00",home:"Hoffenheim", away:"Besiktas"},
  {id:"uel181",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"Ararat-Armenia", away:"AZ Alkmaar"},
  {id:"uel182",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"Ferencvaros", away:"Torreense"},
  {id:"uel183",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"GNK Dinamo", away:"N.E.C."},
  {id:"uel184",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"Juventus", away:"Rennes"},
  {id:"uel185",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"Lech Poznan", away:"Sunderland"},
  {id:"uel186",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"OFI Crete", away:"Leverkusen"},
  {id:"uel187",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"Union SG", away:"H. Beer-Sheva"},
  {id:"uel188",comp:"UEL",date:"2026-10-22",gtime:"19:45",home:"Sturm Graz", away:"Marseille"},
  {id:"uel189",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Bournemouth", away:"Milan"},
  {id:"uel190",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Besiktas", away:"Crystal Palace"},
  {id:"uel191",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Celtic", away:"Celta"},
  {id:"uel192",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Viktoria Plzen", away:"Levski Sofia"},
  {id:"uel193",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Jagiellonia", away:"Anderlecht"},
  {id:"uel194",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Lillestrom", away:"Real Sociedad"},
  {id:"uel195",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Celje", away:"Salzburg"},
  {id:"uel196",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Olympiacos", away:"Sparta Praha"},
  {id:"uel197",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Omonia", away:"Benfica"},
  {id:"uel198",comp:"UEL",date:"2026-10-22",gtime:"22:00",home:"Hoffenheim", away:"Lyon"},
  {id:"uel199",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Milan", away:"Ferencvaros"},
  {id:"uel200",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Sparta Praha", away:"Bournemouth"},
  {id:"uel201",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Crystal Palace", away:"Hoffenheim"},
  {id:"uel202",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Lillestrom", away:"Viktoria Plzen"},
  {id:"uel203",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"N.E.C.", away:"Omonia"},
  {id:"uel204",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Levski Sofia", away:"Jagiellonia"},
  {id:"uel205",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Real Sociedad", away:"Lyon"},
  {id:"uel206",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Anderlecht", away:"Salzburg"},
  {id:"uel207",comp:"UEL",date:"2026-11-05",gtime:"19:45",home:"Rennes", away:"Olympiacos"},
  {id:"uel208",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"AZ Alkmaar", away:"Juventus"},
  {id:"uel209",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"Leverkusen", away:"Marseille"},
  {id:"uel210",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"Celtic", away:"Besiktas"},
  {id:"uel211",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"H. Beer-Sheva", away:"OFI Crete"},
  {id:"uel212",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"Celta", away:"Union SG"},
  {id:"uel213",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"Torreense", away:"Ararat-Armenia"},
  {id:"uel214",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"Sturm Graz", away:"Celje"},
  {id:"uel215",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"Benfica", away:"Lech Poznan"},
  {id:"uel216",comp:"UEL",date:"2026-11-05",gtime:"22:00",home:"Sunderland", away:"GNK Dinamo"},
  {id:"uel217",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"Besiktas", away:"H. Beer-Sheva"},
  {id:"uel218",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"Salzburg", away:"Ararat-Armenia"},
  {id:"uel219",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"Viktoria Plzen", away:"Benfica"},
  {id:"uel220",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"GNK Dinamo", away:"Leverkusen"},
  {id:"uel221",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"Olympiacos", away:"Milan"},
  {id:"uel222",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"Marseille", away:"Levski Sofia"},
  {id:"uel223",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"Union SG", away:"Lech Poznan"},
  {id:"uel224",comp:"UEL",date:"2026-11-26",gtime:"19:45",home:"Celta", away:"Bournemouth"},
  {id:"uel225",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Sparta Praha", away:"AZ Alkmaar"},
  {id:"uel226",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Crystal Palace", away:"Real Sociedad"},
  {id:"uel227",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Ferencvaros", away:"Celje"},
  {id:"uel228",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Juventus", away:"Omonia"},
  {id:"uel229",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"N.E.C.", away:"Rennes"},
  {id:"uel230",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"OFI Crete", away:"Anderlecht"},
  {id:"uel231",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Lyon", away:"Lillestrom"},
  {id:"uel232",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Torreense", away:"Celtic"},
  {id:"uel233",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Sunderland", away:"Jagiellonia"},
  {id:"uel234",comp:"UEL",date:"2026-11-26",gtime:"22:00",home:"Hoffenheim", away:"Sturm Graz"},
  {id:"uel235",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"AZ Alkmaar", away:"Sturm Graz"},
  {id:"uel236",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"Ararat-Armenia", away:"N.E.C."},
  {id:"uel237",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"H. Beer-Sheva", away:"Juventus"},
  {id:"uel238",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"Jagiellonia", away:"Crystal Palace"},
  {id:"uel239",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"Marseille", away:"Celta"},
  {id:"uel240",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"Omonia", away:"Celtic"},
  {id:"uel241",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"Anderlecht", away:"Hoffenheim"},
  {id:"uel242",comp:"UEL",date:"2026-12-10",gtime:"19:45",home:"Rennes", away:"GNK Dinamo"},
  {id:"uel243",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Milan", away:"Sunderland"},
  {id:"uel244",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Bournemouth", away:"Viktoria Plzen"},
  {id:"uel245",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Leverkusen", away:"Besiktas"},
  {id:"uel246",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Salzburg", away:"Sparta Praha"},
  {id:"uel247",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Lech Poznan", away:"Ferencvaros"},
  {id:"uel248",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Celje", away:"Olympiacos"},
  {id:"uel249",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Lyon", away:"Union SG"},
  {id:"uel250",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Levski Sofia", away:"Lillestrom"},
  {id:"uel251",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Real Sociedad", away:"Torreense"},
  {id:"uel252",comp:"UEL",date:"2026-12-10",gtime:"22:00",home:"Benfica", away:"OFI Crete"},
  {id:"uel253",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Besiktas", away:"Union SG"},
  {id:"uel254",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Ararat-Armenia", away:"Celje"},
  {id:"uel255",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Ferencvaros", away:"Juventus"},
  {id:"uel256",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Jagiellonia", away:"Lyon"},
  {id:"uel257",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Lillestrom", away:"Bournemouth"},
  {id:"uel258",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"N.E.C.", away:"Benfica"},
  {id:"uel259",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Olympiacos", away:"Hoffenheim"},
  {id:"uel260",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Real Sociedad", away:"Viktoria Plzen"},
  {id:"uel261",comp:"UEL",date:"2027-01-21",gtime:"19:45",home:"Sturm Graz", away:"OFI Crete"},
  {id:"uel262",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"AZ Alkmaar", away:"GNK Dinamo"},
  {id:"uel263",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"Leverkusen", away:"Salzburg"},
  {id:"uel264",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"Celtic", away:"Marseille"},
  {id:"uel265",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"Crystal Palace", away:"Sparta Praha"},
  {id:"uel266",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"H. Beer-Sheva", away:"Celta"},
  {id:"uel267",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"Lech Poznan", away:"Torreense"},
  {id:"uel268",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"Levski Sofia", away:"Milan"},
  {id:"uel269",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"Anderlecht", away:"Sunderland"},
  {id:"uel270",comp:"UEL",date:"2027-01-21",gtime:"22:00",home:"Rennes", away:"Omonia"},
  {id:"uel271",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Milan", away:"Ararat-Armenia"},
  {id:"uel272",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Sparta Praha", away:"Rennes"},
  {id:"uel273",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Bournemouth", away:"H. Beer-Sheva"},
  {id:"uel274",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Salzburg", away:"Crystal Palace"},
  {id:"uel275",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Viktoria Plzen", away:"Jagiellonia"},
  {id:"uel276",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"GNK Dinamo", away:"Sturm Graz"},
  {id:"uel277",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Juventus", away:"Real Sociedad"},
  {id:"uel278",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Celje", away:"N.E.C."},
  {id:"uel279",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"OFI Crete", away:"Lech Poznan"},
  {id:"uel280",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Marseille", away:"Anderlecht"},
  {id:"uel281",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Lyon", away:"Leverkusen"},
  {id:"uel282",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Omonia", away:"Besiktas"},
  {id:"uel283",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Union SG", away:"Celtic"},
  {id:"uel284",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Celta", away:"Lillestrom"},
  {id:"uel285",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Torreense", away:"Olympiacos"},
  {id:"uel286",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Benfica", away:"AZ Alkmaar"},
  {id:"uel287",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Sunderland", away:"Levski Sofia"},
  {id:"uel288",comp:"UEL",date:"2027-01-28",gtime:"22:00",home:"Hoffenheim", away:"Ferencvaros"},
];

const SCHED_BY_ID=SCHEDULE.reduce((a,m)=>{a[m.id]=m;return a;},{});
const byComp=c=>SCHEDULE.filter(m=>m.comp===c);
const DATES_OF={UCL:[...new Set(byComp("UCL").map(m=>m.date))].sort(),UEL:[...new Set(byComp("UEL").map(m=>m.date))].sort()};
const ALL_DATES=[...new Set(SCHEDULE.map(m=>m.date))].sort();
const matchesOn=(comp,date,sched)=>(sched||SCHEDULE).filter(m=>m.comp===comp&&m.date===date);
// Αριθμος αγωνιστικης ανα ΜΑΤΣ (σταθερος — δεν αλλαζει αν αναβληθει αγωνας)
const MD_BY_ID={};
["UCL","UEL"].forEach(c=>{
  const ds=[...new Set(SCHEDULE.filter(m=>m.comp===c).map(m=>m.date))].sort();
  let md=0,prev=null;
  ds.forEach(d=>{
    if(prev===null||(new Date(d)-new Date(prev))/86400000>3) md++;
    SCHEDULE.filter(m=>m.comp===c&&m.date===d).forEach(m=>{MD_BY_ID[m.id]=md;});
    prev=d;
  });
});
const addDays=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);};
const fmtShort=s=>!s?"":new Date(s+"T12:00:00").toLocaleDateString("el-GR",{day:"numeric",month:"short"});
const fmtLong=s=>!s?"":new Date(s+"T12:00:00").toLocaleDateString("el-GR",{weekday:"long",day:"numeric",month:"long"});

// ── ΒΑΘΜΟΛΟΓΙΑ ──
// results[matchId] = {h:2,a:1}
const outcome1X2=r=>!r?null:(r.h>r.a?"1":r.h<r.a?"2":"X");
const outcomeExtra=r=>{ if(!r)return null; const tot=r.h+r.a; const gg=(r.h>0&&r.a>0);
  return {GG:gg, NG:!gg, OV:tot>=3, UN:tot<=2}; };
// ── ΚΑΝΟΝΕΣ ΒΑΘΜΟΛΟΓΙΑΣ ──
const PTS={PICK_OK:2, PICK_NO:-1, EXTRA_OK:1, EXTRA_NO:-1, UNDERDOG:1};
const UNDERDOG_PCT=25;   // κατω απο αυτο το % = κοντρα στο ρευμα
const UNDERDOG_MIN=6;    // ελαχιστοι ψηφοφοροι για να μετρησει το μπονους

// Υπολογιζει, μια φορα, τα ποσοστα της παρεας για ΚΑΘΕ ματς
function buildCrowd(predictions){
  const c={};
  Object.values(predictions).forEach(byDate=>{
    Object.values(byDate||{}).forEach(byMatch=>{
      Object.entries(byMatch||{}).forEach(([mid,v])=>{
        if(!v||!v.pick) return;
        c[mid]??={n:0,"1":0,"X":0,"2":0};
        c[mid][v.pick]++; c[mid].n++;
      });
    });
  });
  return c;
}
const crowdPct=(cm,mid,pick)=>{
  const c=cm?.[mid]; if(!c||!c.n) return null;
  return Math.round(c[pick]/c.n*100);
};
// Ισχυει το μπονους «κοντρα στο ρευμα» για τη σωστη βασικη επιλογη;
function isUnderdog(cm,mid,pick){
  const c=cm?.[mid];
  if(!c||c.n<UNDERDOG_MIN) return false;
  return (c[pick]/c.n*100) < UNDERDOG_PCT;
}
// Ποντοι ενος ματς. cm = crowd map (προαιρετικο — χωρις αυτο δεν δινεται μπονους)
function matchPoints(pick,extra,r,cm,mid){
  if(!r) return 0;
  let p=0;
  const o=outcome1X2(r);
  if(pick){
    if(pick===o){
      p+=PTS.PICK_OK;
      if(isUnderdog(cm,mid,pick)) p+=PTS.UNDERDOG;
    } else p+=PTS.PICK_NO;
  }
  if(extra){ const ex=outcomeExtra(r); p += (ex[extra]?PTS.EXTRA_OK:PTS.EXTRA_NO); }
  return p;
}
function findVote(up,matchId){
  if(!up) return null;
  for(const d in up){ if(up[d]&&up[d][matchId]) return up[d][matchId]; }
  return null;
}
function totalPoints(up,results,comp,cm){
  let t=0;
  SCHEDULE.forEach(m=>{
    if(comp&&m.comp!==comp) return;
    const v=findVote(up,m.id); if(!v) return;
    t+=matchPoints(v.pick,v.extra,results[m.id],cm,m.id);
  });
  return t;
}
function dayPoints(date,up,results,comp,cm,sched){
  let t=0;
  (sched||SCHEDULE).filter(m=>m.date===date&&(!comp||m.comp===comp)).forEach(m=>{
    const v=findVote(up,m.id); if(!v) return;
    t+=matchPoints(v.pick,v.extra,results[m.id],cm,m.id);
  });
  return t;
}
function playerStats(up,results,comp){
  let c=0,w=0,ec=0,ew=0,tot=0;
  SCHEDULE.forEach(m=>{
    if(comp&&m.comp!==comp) return;
    const v=findVote(up,m.id); if(!v) return;
    tot++;
    const r=results[m.id]; if(!r) return;
    const o=outcome1X2(r);
    if(v.pick){ if(v.pick===o)c++; else w++; }
    if(v.extra){ const ex=outcomeExtra(r); if(ex[v.extra])ec++; else ew++; }
  });
  const dec=c+w;
  return {correct:c,wrong:w,exCorrect:ec,exWrong:ew,total:tot,pct:dec?Math.round(c/dec*100):0};
}
function crowdVotes(matchId,predictions){
  const c={"1":0,"X":0,"2":0},e={GG:0,NG:0,OV:0,UN:0};
  let n=0,ne=0;
  Object.values(predictions).forEach(byDate=>{
    const v=findVote(byDate,matchId); if(!v)return;
    if(v.pick){c[v.pick]++;n++;}
    if(v.extra){e[v.extra]++;ne++;}
  });
  const p=(x,d)=>d?Math.round(x/d*100):0;
  return {n,ne,p1:p(c["1"],n),pX:p(c["X"],n),p2:p(c["2"],n),
    ex:{GG:p(e.GG,ne),NG:p(e.NG,ne),OV:p(e.OV,ne),UN:p(e.UN,ne)}};
}
function voteStreak(up){
  const past=ALL_DATES.filter(d=>d<=new Date().toISOString().slice(0,10));
  let s=0;
  for(let i=past.length-1;i>=0;i--){
    const any=SCHEDULE.filter(m=>m.date===past[i]).some(m=>findVote(up,m.id));
    if(any)s++; else break;
  }
  return s;
}
function computeBadges(up,results,isLeader){
  const st=playerStats(up,results);
  const b=[];
  if(isLeader) b.push({i:"👑",n:"Κορυφη"});
  if(st.pct>=70&&(st.correct+st.wrong)>=8) b.push({i:"🎯",n:"Σκοπευτης"});
  if(st.exCorrect>=10) b.push({i:"🎲",n:"Ριψοκινδυνος"});
  if(voteStreak(up)>=4) b.push({i:"🔥",n:"Σταθερος"});
  if(st.correct>=25) b.push({i:"⭐",n:"Βετερανος"});
  if(st.total>0&&st.total<5) b.push({i:"🌱",n:"Νεοφερμενος"});
  return b;
}

// ══ LIVE ΑΠΟΤΕΛΕΣΜΑΤΑ (ESPN — δωρεαν, χωρις κλειδι) ══
const ESPN_SLUG={UCL:"uefa.champions",UEL:"uefa.europa"};
// Κλειδι-λεξη ανα ομαδα, για ταιριασμα με τα ονοματα του ESPN
const TEAM_KEY={
"AEK Athens":"aek","LASK":"lask","Club Brugge":"brugge","Aston Villa":"aston villa",
"Borussia Dortmund":"dortmund","Villarreal":"villarreal","Porto":"porto","Manchester City":"manchester city",
"Lille":"lille","Real Betis":"betis","Real Madrid":"real madrid","Inter":"inter",
"Barcelona":"barcelona","Feyenoord":"feyenoord","Stuttgart":"stuttgart","Viking":"viking",
"Liverpool":"liverpool","Atletico Madrid":"atletico","Paris Saint-Germain":"paris","Slovan Bratislava":"slovan",
"Sporting CP":"sporting","Galatasaray":"galatasaray","Napoli":"napoli","Arsenal":"arsenal",
"Fenerbahce":"fenerbah","Roma":"roma","PSV Eindhoven":"psv","Shakhtar Donetsk":"shakhtar",
"Como":"como","Leipzig":"leipzig","Bayern Munchen":"bayern","Bodo/Glimt":"glimt",
"Manchester United":"manchester united","Sabah":"sabah","Slavia Praha":"slavia","Lens":"lens",
"Ararat-Armenia":"ararat","Sparta Praha":"sparta","Omonia":"omonia","Celta":"celta",
"Milan":"milan","Benfica":"benfica","Leverkusen":"leverkusen","Celje":"celje",
"H. Beer-Sheva":"sheva","GNK Dinamo":"dinamo","Olympiacos":"olympia","Jagiellonia":"jagiellonia",
"Anderlecht":"anderlecht","Lyon":"lyon","Sturm Graz":"sturm","Rennes":"rennes",
"Sunderland":"sunderland","AZ Alkmaar":"alkmaar","OFI Crete":"ofi","Hoffenheim":"hoffenheim",
"Levski Sofia":"levski","Salzburg":"salzburg","Besiktas":"besikta","Marseille":"marseille",
"Celtic":"celtic","Ferencvaros":"ferencv","Crystal Palace":"crystal palace","Lech Poznan":"lech",
"Viktoria Plzen":"plzen","Union SG":"union","Juventus":"juventus","N.E.C.":"nec",
"Lillestrom":"lillestr","Torreense":"torreense","Real Sociedad":"sociedad","Bournemouth":"bournemouth",
};
const normTeam=s=>(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
  .replace(/ø/g,"o").replace(/ß/g,"ss").replace(/[''`.]/g,"")
  .replace(/[^a-z0-9 /]/g," ").replace(/\s+/g," ").trim();
const sameTeam=(mine,espn)=>{const k=TEAM_KEY[mine];return k?normTeam(espn).includes(normTeam(k)):false;};

// Επιστρεφει { matchId: {h,a,live,done,clock} } για τη συγκεκριμενη ημερομηνια
async function fetchESPN(comp,date){
  const ymd=date.replace(/-/g,"");
  const base=`https://site.api.espn.com/apis/site/v2/sports/soccer/${ESPN_SLUG[comp]}/scoreboard?dates=${ymd}`;
  const urls=[base,`https://api.allorigins.win/raw?url=${encodeURIComponent(base)}`];
  let data=null,err=null;
  for(const u of urls){
    try{
      const r=await fetch(u,{cache:"no-store"});
      if(!r.ok){err=`HTTP ${r.status}`;continue;}
      data=await r.json(); if(data?.events)break;
    }catch(e){err=e.message;}
  }
  if(!data) throw new Error(err||"Δεν φορτωσαν τα δεδομενα");
  const out={},logos={};
  const lgl=(data.leagues?.[0]?.logos||[]).find(x=>(x.rel||[]).includes("dark"))||data.leagues?.[0]?.logos?.[0];
  if(lgl?.href) logos["__"+comp]=lgl.href;
  (data.events||[]).forEach(ev=>{
    const c=ev.competitions?.[0]; if(!c)return;
    const cs=c.competitors||[];
    const H=cs.find(x=>x.homeAway==="home"), A=cs.find(x=>x.homeAway==="away");
    if(!H||!A)return;
    const hn=H.team?.displayName||H.team?.name, an=A.team?.displayName||A.team?.name;
    const st=c.status?.type||{};
    const done=!!st.completed, state=st.state; // pre | in | post
    const mine=SCHEDULE.find(m=>m.comp===comp&&m.date===date&&sameTeam(m.home,hn)&&sameTeam(m.away,an));
    if(!mine)return;
    if(H.team?.logo) logos[mine.home]=H.team.logo;
    if(A.team?.logo) logos[mine.away]=A.team.logo;
    out[mine.id]={h:Number(H.score??0),a:Number(A.score??0),done,live:state==="in",
      clock:c.status?.displayClock||""};
  });
  return {scores:out,logos};
}

const LS="uefa_session";

function LoginScreen({mode,setMode,lf,setLf,rf,setRf,lerr,rerr,onLogin,onReg,busy}){
  const isReg=mode==="register";
  return(
    <div className="login-fs">
      <div className="lf-orb lf-o1"/><div className="lf-orb lf-o2"/><div className="lf-scan"/>
      <div className="login-box">
        <div className="login-bar"/>
        <div className="login-head">
          <img className="login-logo" src={LOGO} alt="Euro Picks"/>
          {isReg&&<div className="login-title2">ΕΓΓΡΑΦΗ</div>}
          <div className="login-sub">{isReg?"ΔΗΜΙΟΥΡΓΙΑ ΛΟΓΑΡΙΑΣΜΟΥ":"CHAMPIONS · EUROPA LEAGUE"}</div>
        </div>
        <div className="login-body">
          {isReg?(<>
            {rerr&&<div className="lerr">{rerr}</div>}
            <div className="lfield"><label>Username</label><input value={rf.u} onChange={e=>setRf(p=>({...p,u:e.target.value}))} placeholder="Επιλεξε username"/></div>
            <div className="lfield"><label>Password</label><input type="password" value={rf.p} onChange={e=>setRf(p=>({...p,p:e.target.value}))} placeholder="Τουλαχιστον 4 χαρακτηρες"/></div>
            <div className="lfield"><label>Επιβεβαιωση</label><input type="password" value={rf.c} onChange={e=>setRf(p=>({...p,c:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&onReg()} placeholder="Ξανα το password"/></div>
            <button className="login-submit" onClick={onReg} disabled={busy}>{busy?"...":"ΕΓΓΡΑΦΗ"}</button>
            <div className="lsw">Εχεις λογαριασμο; <button onClick={()=>setMode("login")}>Συνδεση</button></div>
          </>):(<>
            {lerr&&<div className="lerr">{lerr}</div>}
            <div className="lfield"><label>Username</label><input value={lf.u} onChange={e=>setLf(p=>({...p,u:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&onLogin()} placeholder="Το username σου"/></div>
            <div className="lfield"><label>Password</label><input type="password" value={lf.p} onChange={e=>setLf(p=>({...p,p:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&onLogin()} placeholder="••••••••"/></div>
            <button className="login-submit" onClick={onLogin} disabled={busy}>{busy?"...":"ΕΙΣΟΔΟΣ"}</button>
            <div className="lsw">Δεν εχεις λογαριασμο; <button onClick={()=>setMode("register")}>Εγγραφη</button></div>
            <div className="lhint">Admin: admin / admin123</div>
          </>)}
        </div>
      </div>
    </div>
  );
}

function Confetti(){
  const cols=["#3b82f6","#93c5fd","#ff7a00","#ffb066","#eef2ff"];
  return(<div className="confetti-layer">{Array.from({length:50},(_,i)=>(
    <span key={i} className="cpc" style={{left:`${Math.random()*100}%`,width:6+Math.random()*7,height:(6+Math.random()*7)*1.4,
      background:cols[i%cols.length],animationDelay:`${Math.random()*.5}s`,animationDuration:`${1.7+Math.random()*1.1}s`}}/>
  ))}</div>);
}

export default function App(){
  const [booting,setBooting]=useState(true);
  const [me,setMe]=useState(null);
  const [view,setView]=useState("login");
  const [comp,setComp]=useState("UCL");
  const [lf,setLf]=useState({u:"",p:""});
  const [rf,setRf]=useState({u:"",p:"",c:""});
  const [lerr,setLerr]=useState("");const [rerr,setRerr]=useState("");
  const [busy,setBusy]=useState(false);
  const [toast,setToast]=useState(null);
  const [adminTab,setAdminTab]=useState("results");
  const [adminDate,setAdminDate]=useState("");
  const [scoreDraft,setScoreDraft]=useState({});
  const [clearDaySel,setClearDaySel]=useState({});
  const [confetti,setConfetti]=useState(false);
  const [sharing,setSharing]=useState(false);
  const [lbComp,setLbComp]=useState("ALL");
  const [openExtra,setOpenExtra]=useState({});
  const [showRules,setShowRules]=useState(false);   // matchId -> ανοιχτο το εξτρα
  const [viewDate,setViewDate]=useState(null);   // ποια αγωνιστικη βλεπουμε
  const prevPtsRef=useRef(null);

  const [users,setUsers]=useState([]);
  const [predictions,setPredictions]=useState({});
  const [results,setResults]=useState({});
  const [matchTimes,setMatchTimes]=useState({});
  const [adjustments,setAdjustments]=useState({});
  const [nowTick,setNowTick]=useState(Date.now());
  const [live,setLive]=useState({});        // matchId -> {h,a,live,done,clock}
  const [logos,setLogos]=useState({});      // teamName -> logo url
  const [matchDates,setMatchDates]=useState({}); // matchId -> νεα ημερομηνια (αναβολες)
  const [tOffset,setTOffset]=useState(0);       // διαφορα ρολογιου συσκευης απο server
  const [syncing,setSyncing]=useState(false);
  const [lastSync,setLastSync]=useState(null);

  const showToast=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),1500);};
  useEffect(()=>{const t=setInterval(()=>setNowTick(Date.now()),30000);return()=>clearInterval(t);},[]);

  // Συγχρονισμος ωρας με τον server — ωστε να μη μπορει καποιος να αλλαξει
  // το ρολοι της συσκευης του και να ψηφισει μετα το κλειδωμα.
  useEffect(()=>{
    let alive=true;
    async function syncClock(){
      try{
        const r=await fetch(`${SUPABASE_URL}/rest/v1/`,{method:"HEAD",headers:{apikey:SUPABASE_KEY},cache:"no-store"});
        const d=r.headers.get("date");
        if(d&&alive){
          const off=new Date(d).getTime()-Date.now();
          if(Math.abs(off)>3000) setTOffset(off);   // διορθωση μονο αν η αποκλιση ειναι ουσιαστικη
          else setTOffset(0);
        }
      }catch{}
    }
    syncClock();
    const iv=setInterval(syncClock,600000); // καθε 10 λεπτα
    return()=>{alive=false;clearInterval(iv);};
  },[]);

  const pad2=n=>String(n).padStart(2,"0");
  const gNow=new Date(new Date(nowTick+tOffset).toLocaleString("en-US",{timeZone:"Europe/Athens"}));
  const todayStr=`${gNow.getFullYear()}-${pad2(gNow.getMonth()+1)}-${pad2(gNow.getDate())}`;
  // Η τρεχουσα αγωνιστικη μερα: μεχρι τις 06:00 μετραει η χθεσινη (τα ματς τελειωνουν ~24:00)
  const activeDate = gNow.getHours()<6 ? addDays(todayStr,-1) : todayStr;

  const kickoff=id=>matchTimes[id]||SCHED_BY_ID[id]?.gtime||"";
  function isLocked(id,date){
    const t=kickoff(id); if(!t) return false;
    const [h,m]=t.split(":").map(Number); if(isNaN(h)) return false;
    const ko=new Date(`${date}T${pad2(h)}:${pad2(m)}:00`);
    return gNow.getTime()>=ko.getTime()-15*60*1000;
  }


  // Πoση ωρα μενει μεχρι το κλειδωμα (15' πριν τη σεντρα)
  function lockIn(id,date){
    const t=kickoff(id); if(!t) return null;
    const [h,mi]=t.split(":").map(Number); if(isNaN(h)) return null;
    const lockAt=new Date(`${date}T${pad2(h)}:${pad2(mi)}:00`).getTime()-15*60*1000;
    const diff=lockAt-gNow.getTime();
    if(diff<=0) return null;
    const mins=Math.floor(diff/60000);
    const d=Math.floor(mins/1440), hh=Math.floor((mins%1440)/60), mm=mins%60;
    return {mins, urgent:mins<=30,
      txt: d>0 ? `${d}μ ${hh}ω` : hh>0 ? `${hh}ω ${mm}′` : `${mm}′`};
  }

  const loadAll=useCallback(async()=>{
    try{
      async function allPreds(){
        const out=[];let from=0;
        for(let i=0;i<60;i++){
          const {data,error}=await supabase.from("predictions").select("*").range(from,from+999);
          if(error||!data||!data.length) break;
          out.push(...data); if(data.length<1000) break; from+=1000;
        }
        return out;
      }
      const [{data:us},preds,{data:gd}]=await Promise.all([
        supabase.from("users").select("*"), allPreds(), supabase.from("game_data").select("*"),
      ]);
      setUsers(us||[]);
      const pm={};
      (preds||[]).forEach(p=>{
        pm[p.user_id]??={}; pm[p.user_id][p.match_date]??={};
        pm[p.user_id][p.match_date][p.match_id]={pick:p.pick||null,extra:p.extra||null};
      });
      setPredictions(pm);
      (gd||[]).forEach(r=>{
        if(r.key==="results")setResults(r.value||{});
        if(r.key==="matchTimes")setMatchTimes(r.value||{});
        if(r.key==="adjustments")setAdjustments(r.value||{});
        if(r.key==="logos")setLogos(r.value||{});
        if(r.key==="matchDates")setMatchDates(r.value||{});
      });
    }catch(e){console.error(e);}
  },[]);

  useEffect(()=>{
    (async()=>{
      await loadAll();
      try{
        const s=localStorage.getItem(LS);
        if(s){const {id}=JSON.parse(s);
          const {data}=await supabase.from("users").select("*").eq("id",id).maybeSingle();
          if(data){setMe(data);setView(data.is_admin?"admin":"predict");}}
      }catch{}
      setBooting(false);
    })();
    const ch=supabase.channel("uefa-ch")
      .on("postgres_changes",{event:"*",schema:"public",table:"predictions"},loadAll)
      .on("postgres_changes",{event:"*",schema:"public",table:"users"},loadAll)
      .on("postgres_changes",{event:"*",schema:"public",table:"game_data"},loadAll)
      .subscribe();
    const p=setInterval(loadAll,25000);
    return()=>{supabase.removeChannel(ch);clearInterval(p);};
  },[loadAll]);

  async function login(){
    setBusy(true);setLerr("");
    try{
      const u=lf.u.trim(),p=lf.p.trim();
      const {data}=await supabase.from("users").select("*").ilike("username",u).maybeSingle();
      if(!data||data.password!==p){setLerr("Λαθος στοιχεια");setBusy(false);return;}
      localStorage.setItem(LS,JSON.stringify({id:data.id}));
      setMe(data);setView(data.is_admin?"admin":"predict");await loadAll();
    }catch(e){setLerr("Σφαλμα συνδεσης");}
    setBusy(false);
  }
  async function reg(){
    setRerr("");
    const u=rf.u.trim();
    if(!u){setRerr("Βαλε username");return;}
    if(rf.p.trim().length<4){setRerr("Password τουλαχιστον 4 χαρακτηρες");return;}
    if(rf.p.trim()!==rf.c.trim()){setRerr("Τα password δεν ταιριαζουν");return;}
    setBusy(true);
    try{
      const {data:ex}=await supabase.from("users").select("id").ilike("username",u).maybeSingle();
      if(ex){setRerr("Υπαρχει ηδη αυτο το username");setBusy(false);return;}
      const nu={id:`u${Date.now()}`,username:u,password:rf.p.trim(),is_admin:false};
      const {error}=await supabase.from("users").insert(nu);
      if(error){setRerr("Σφαλμα εγγραφης");setBusy(false);return;}
      localStorage.setItem(LS,JSON.stringify({id:nu.id}));
      setMe(nu);setView("predict");await loadAll();
    }catch(e){setRerr("Σφαλμα συνδεσης");}
    setBusy(false);
  }
  const logout=()=>{localStorage.removeItem(LS);setMe(null);setView("login");setLf({u:"",p:""});};

  // ── ΨΗΦΟΣ ──
  async function vote(m,field,val){
    if(isLocked(m.id,m.date)){showToast("Η ψηφοφορια εκλεισε","err");return;}
    const cur=findVote(predictions[me.id],m.id)||{pick:null,extra:null};
    // Ξαναπατημα της ιδιας ΕΞΤΡΑ επιλογης = αφαιρεση (ειναι προαιρετικη)
    const isSame = cur[field]===val;
    if(isSame && field==="pick") return;              // η βασικη δεν αφαιρειται
    const next={...cur,[field]: isSame ? null : val};
    setPredictions(prev=>{const n={...prev};n[me.id]??={};n[me.id][m.date]??={};
      n[me.id][m.date]={...n[me.id][m.date],[m.id]:next};return n;});
    showToast(
      isSame ? "Εξτρα επιλογη αφαιρεθηκε"
      : cur[field] ? "Η επιλογη σου αλλαξε"
      : field==="pick" ? "Ψηφισες" : "Εξτρα επιλογη"
    );
    const {error}=await supabase.from("predictions")
      .upsert({user_id:me.id,match_id:m.id,match_date:m.date,pick:next.pick,extra:next.extra},{onConflict:"user_id,match_id"});
    if(error){showToast("Σφαλμα — δοκιμασε ξανα","err");loadAll();}
  }

  // ── ADMIN ──
  // ── LIVE SYNC: τραβαει απο ESPN, δειχνει live σκορ, γραφει τα ΤΕΛΙΚΑ στη βαση ──
  const syncLive=useCallback(async(date,manual=false)=>{
    if(!date) return;
    setSyncing(true);
    try{
      const both=await Promise.all(["UCL","UEL"].map(c=>fetchESPN(c,date).catch(()=>({scores:{},logos:{}}))));
      const merged={...both[0].scores,...both[1].scores};
      const newLogos={...both[0].logos,...both[1].logos};
      setLive(l=>({...l,...merged}));
      setLastSync(Date.now());
      // νεα λογοτυπα -> βαση
      const missing=Object.entries(newLogos).filter(([t,u])=>logos[t]!==u);
      if(missing.length){
        const nl={...logos}; missing.forEach(([t,u])=>{nl[t]=u;});
        setLogos(nl);
        await supabase.from("game_data").upsert({key:"logos",value:nl,updated_at:new Date().toISOString()});
      }
      // τελικα σκορ -> βαση (μονο οσα αλλαξαν)
      const finals={};
      Object.entries(merged).forEach(([id,v])=>{ if(v.done) finals[id]={h:v.h,a:v.a}; });
      const changed=Object.entries(finals).filter(([id,v])=>{
        const cur=results[id]; return !cur||cur.h!==v.h||cur.a!==v.a;
      });
      if(changed.length){
        const next={...results}; changed.forEach(([id,v])=>{next[id]=v;});
        setResults(next);
        await supabase.from("game_data").upsert({key:"results",value:next,updated_at:new Date().toISOString()});
        if(manual) showToast(`${changed.length} νεα αποτελεσματα`);
      }else if(manual){
        const n=Object.keys(merged).length;
        showToast(n?"Ολα ενημερωμενα":"Δεν βρεθηκαν ματς");
      }
    }catch(e){ if(manual) showToast("Σφαλμα: "+e.message,"err"); }
    setSyncing(false);
  },[results,logos]);

  // Μαζευει λογοτυπα ολων των ομαδων απο ολες τις αγωνιστικες (μια φορα)
  async function harvestLogos(){
    setSyncing(true);
    try{
      const all={...logos};
      for(const c of ["UCL","UEL"]){
        for(const d of datesOf[c]){
          try{ const r=await fetchESPN(c,d); Object.assign(all,r.logos); }catch{}
        }
      }
      setLogos(all);
      await supabase.from("game_data").upsert({key:"logos",value:all,updated_at:new Date().toISOString()});
      showToast(`${Object.keys(all).length} λογοτυπα`);
    }catch(e){ showToast("Σφαλμα λογοτυπων","err"); }
    setSyncing(false);
  }

  async function saveScore(id,h,a){
    const merged={...results};
    if(h===""||a===""||h==null||a==null) delete merged[id];
    else merged[id]={h:Number(h),a:Number(a)};
    setResults(merged);
    await supabase.from("game_data").upsert({key:"results",value:merged,updated_at:new Date().toISOString()});
    showToast("Αποτελεσμα αποθηκευτηκε");
  }
  async function moveMatch(id,newDate){
    const merged={...matchDates};
    if(!newDate||newDate===SCHED_BY_ID[id]?.date) delete merged[id];
    else merged[id]=newDate;
    setMatchDates(merged);
    await supabase.from("game_data").upsert({key:"matchDates",value:merged,updated_at:new Date().toISOString()});
    showToast(newDate&&newDate!==SCHED_BY_ID[id]?.date?"Ο αγωνας μεταφερθηκε":"Επανηλθε η αρχικη ημερομηνια");
  }
  async function adjustPoints(uid,d){
    const m={...adjustments,[uid]:(adjustments[uid]||0)+d};
    if(m[uid]===0)delete m[uid];
    setAdjustments(m);
    await supabase.from("game_data").upsert({key:"adjustments",value:m,updated_at:new Date().toISOString()});
    showToast(d>0?`+${d} ποντος`:`${d} ποντος`);
  }
  async function clearVotes(uid,date){
    setPredictions(p=>{const n={...p};if(n[uid]){n[uid]={...n[uid]};delete n[uid][date];}return n;});
    await supabase.from("predictions").delete().eq("user_id",uid).eq("match_date",date);
    await loadAll(); showToast("Οι ψηφοι καθαριστηκαν");
  }
  async function delUser(uid){
    setUsers(u=>u.filter(x=>x.id!==uid));
    await supabase.from("users").delete().eq("id",uid);
    await loadAll(); showToast("Διαγραφηκε","err");
  }

  // ── DERIVED ──
  // Ενεργο προγραμμα: εφαρμοζει τις μεταφορες αγωνων
  const SCH=useMemo(()=>SCHEDULE.map(m=>matchDates[m.id]?{...m,date:matchDates[m.id]}:m),[matchDates]);
  const datesOf=useMemo(()=>({
    UCL:[...new Set(SCH.filter(m=>m.comp==="UCL").map(m=>m.date))].sort(),
    UEL:[...new Set(SCH.filter(m=>m.comp==="UEL").map(m=>m.date))].sort(),
  }),[SCH]);
  const dateOfMatch=id=>matchDates[id]||SCHED_BY_ID[id]?.date;
  const myPreds=me?(predictions[me.id]||{}):{};
  // Βαρια υπολογισμενα — ξαναγινονται ΜΟΝΟ οταν αλλαξουν τα δεδομενα, οχι σε καθε render
  const crowdMap=useMemo(()=>buildCrowd(predictions),[predictions]);
  const board=useMemo(()=>users.map(u=>{
    const p=predictions[u.id]||{};
    const adj=adjustments[u.id]||0;
    const st=playerStats(p,results,lbComp==="ALL"?null:lbComp);
    return {...u,isAdmin:u.is_admin,adj,st,
      ucl:totalPoints(p,results,"UCL",crowdMap), uel:totalPoints(p,results,"UEL",crowdMap),
      total:totalPoints(p,results,null,crowdMap)+adj};
  }).sort((a,b)=>{
    const va=lbComp==="ALL"?a.total:lbComp==="UCL"?a.ucl:a.uel;
    const vb=lbComp==="ALL"?b.total:lbComp==="UCL"?b.ucl:b.uel;
    if(vb!==va) return vb-va;                              // 1. ποντοι
    if(b.st.correct!==a.st.correct) return b.st.correct-a.st.correct; // 2. σωστες βασικες
    if(b.st.pct!==a.st.pct) return b.st.pct-a.st.pct;      // 3. ευστοχια
    return a.username.localeCompare(b.username,"el");      // 4. αλφαβητικα
  }),
  [users,predictions,results,adjustments,crowdMap,lbComp]);
  const myBoard=board.find(u=>u.id===me?.id);
  const prevRank=useMemo(()=>{
    const dwr=ALL_DATES.filter(d=>SCHEDULE.some(m=>m.date===d&&results[m.id]));
    const last=dwr[dwr.length-1];
    if(!last) return {};
    const prevRes={};
    Object.entries(results).forEach(([id,v])=>{ if(SCHED_BY_ID[id]?.date!==last) prevRes[id]=v; });
    const pb=users.map(u=>({id:u.id,
      t:totalPoints(predictions[u.id]||{},prevRes,lbComp==="ALL"?null:lbComp,crowdMap)+(lbComp==="ALL"?(adjustments[u.id]||0):0)}))
      .sort((a,b)=>b.t-a.t);
    const r={}; pb.forEach((u,i)=>{r[u.id]=i+1;}); return r;
  },[users,predictions,results,adjustments,crowdMap,lbComp]);

  // Παικτης της τελευταιας ολοκληρωμενης αγωνιστικης
  const mvp=useMemo(()=>{
    const done=[...new Set(SCH.filter(m=>results[m.id]).map(m=>m.date))].sort();
    const d=done[done.length-1];
    if(!d) return null;
    const rows=users.map(u=>({u,p:dayPoints(d,predictions[u.id]||{},results,null,crowdMap,SCH)}))
      .filter(r=>r.p!==0).sort((a,b)=>b.p-a.p);
    if(!rows.length||rows[0].p<=0) return null;
    const top=rows.filter(r=>r.p===rows[0].p);
    return {date:d,pts:rows[0].p,names:top.map(r=>r.u.username)};
  },[SCH,users,predictions,results,crowdMap]);

  const todayMatches=matchesOn(comp,activeDate);

  useEffect(()=>{
    if(!me||!myBoard)return;
    const t=myBoard.total;
    if(prevPtsRef.current===null){prevPtsRef.current=t;return;}
    if(t>prevPtsRef.current){setConfetti(true);setTimeout(()=>setConfetti(false),2600);}
    prevPtsRef.current=t;
  },[myBoard?.total,me]);

  useEffect(()=>{ setViewDate(null); if(!adminDate) setAdminDate(datesOf[comp][0]||""); },[comp]);

  // ── ΑΥΤΟΜΑΤΟΣ ΣΥΓΧΡΟΝΙΣΜΟΣ ──
  // Τρεχει μονο οταν υπαρχουν ματς που εχουν ξεκινησει και δεν εχουν τελικο αποτελεσμα.
  useEffect(()=>{
    if(!me) return;
    const pending=SCHEDULE.filter(m=>m.date===activeDate).some(m=>{
      if(results[m.id]) return false;               // εχει ηδη αποτελεσμα
      const t=kickoff(m.id); if(!t) return false;
      const [h,mi]=t.split(":").map(Number);
      return gNow.getTime()>=new Date(`${activeDate}T${pad2(h)}:${pad2(mi)}:00`).getTime();
    });
    if(!pending) return;
    syncLive(activeDate);
    const iv=setInterval(()=>syncLive(activeDate),180000); // καθε 3 λεπτα
    return()=>clearInterval(iv);
  },[me,activeDate,results,nowTick>0]);

  async function shareLeaderboard(){
    setSharing(true);
    try{
      const top=board.slice(0,15);
      const W=1080,rowH=76,headH=280,footH=80;
      const H=headH+top.length*rowH+footH;
      const c=document.createElement("canvas");c.width=W;c.height=H;
      const x=c.getContext("2d");
      const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#0a1024");g.addColorStop(1,"#05070f");
      x.fillStyle=g;x.fillRect(0,0,W,H);
      x.textAlign="center";
      x.fillStyle="#93c5fd";x.font="800 66px Georgia, serif";x.fillText("EURO PICKS",W/2,120);
      x.fillStyle="#8b93a7";x.font="600 30px Georgia, serif";
      x.fillText(lbComp==="ALL"?"ΣΥΝΟΛΙΚΗ ΚΑΤΑΤΑΞΗ":lbComp==="UCL"?"CHAMPIONS LEAGUE":"EUROPA LEAGUE",W/2,172);
      x.fillStyle="#5b6478";x.font="400 24px Georgia, serif";
      x.fillText(new Date().toLocaleDateString("el-GR",{day:"numeric",month:"long",year:"numeric"}),W/2,214);
      x.strokeStyle="rgba(147,197,253,0.3)";x.lineWidth=2;
      x.beginPath();x.moveTo(80,headH-30);x.lineTo(W-80,headH-30);x.stroke();
      top.forEach((u,i)=>{
        const y=headH+i*rowH;
        const pts=lbComp==="ALL"?u.total:lbComp==="UCL"?u.ucl:u.uel;
        if(u.id===me?.id){x.fillStyle="rgba(147,197,253,0.08)";x.fillRect(40,y,W-80,rowH-8);}
        x.textAlign="left";
        x.fillStyle=i<3?"#93c5fd":"#8b93a7";x.font="700 38px Georgia, serif";
        x.fillText(i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}`,70,y+48);
        x.fillStyle="#eef2ff";x.font="600 36px Georgia, serif";
        let nm=u.username;if(nm.length>22)nm=nm.slice(0,21)+"…";
        x.fillText(nm,190,y+48);
        x.textAlign="right";
        x.fillStyle=pts>=0?"#93c5fd":"#ff6b6b";x.font="800 42px Georgia, serif";
        x.fillText(String(pts),W-70,y+48);
      });
      x.textAlign="center";x.fillStyle="#5b6478";x.font="400 22px Georgia, serif";
      x.fillText("⭐ Champions League  ·  🔶 Europa League",W/2,H-34);
      const blob=await new Promise(r=>c.toBlob(r,"image/png"));
      const file=new File([blob],"europicks.png",{type:"image/png"});
      if(navigator.canShare&&navigator.canShare({files:[file]})) await navigator.share({files:[file],title:"Euro Picks"});
      else{const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download="europicks.png";a.click();URL.revokeObjectURL(u);showToast("Η εικονα κατεβηκε");}
    }catch(e){if(e.name!=="AbortError")showToast("Σφαλμα μοιρασιας","err");}
    setSharing(false);
  }

  // ─────────── RENDER ───────────
  function teamBadge(name){
    const src=logos[name];
    return <span className="bg">{src
      ? <img src={src} alt="" loading="lazy" onError={e=>{e.target.replaceWith(document.createTextNode(F(name)));}}/>
      : F(name)}</span>;
  }

  function matchCard(m){
    const v=findVote(myPreds,m.id)||{pick:null,extra:null};
    const r=results[m.id];
    const lv=live[m.id];
    const locked=isLocked(m.id,m.date);
    const o=outcome1X2(r), ex=outcomeExtra(r);
    const pw=v.pick&&o?(v.pick===o):null;
    const ew=v.extra&&ex?ex[v.extra]:null;
    const pts=matchPoints(v.pick,v.extra,r,crowdMap,m.id);
    const gotBonus=v.pick&&r&&v.pick===o&&isUnderdog(crowdMap,m.id,v.pick);
    const crowd=locked?crowdVotes(m.id,predictions):null;
    const showExtra=!!v.extra||!!openExtra[m.id];
    return(
      <div key={m.id} className={`m${v.pick?" sel":""}${r?(pts>0?" won":pts<0?" lost":""):""}`}
        style={{"--cl":`linear-gradient(180deg,${TC(m.home)},${TC(m.away)})`}}>
        <div className="mr">
          <div className="side">{teamBadge(m.home)}<span className="nm">{SN(m.home)}</span></div>
          <div className="mmid">
            {r && <span className={`sc2 ${pts>0?"g":pts<0?"r":"n"}`}>{r.h}-{r.a}</span>}
            {!r && lv && lv.live && <span className="lv2"><i/>{lv.h}-{lv.a}</span>}
            {!r && !lv?.live && <span className="vsx">–</span>}
            {gotBonus&&<span className="udg2">🎖️</span>}
            {r&&<span className={`ptsx ${pts>0?"g":pts<0?"r":"n"}`}>{pts>0?`+${pts}`:pts}</span>}
          </div>
          <div className="side r"><span className="nm">{SN(m.away)}</span>{teamBadge(m.away)}</div>
        </div>
        <div className="btns">
          {["1","X","2"].map(k=>(
            <button key={k} className={`b${v.pick===k?` on${pw===true?" ok":pw===false?" no":""}`:""}${locked?" lk":""}`}
              onClick={()=>!locked&&vote(m,"pick",k)}>
              <span className="b-k">{k}</span>
              {crowd&&crowd.n>0&&<span className="b-p">{k==="1"?crowd.p1:k==="X"?crowd.pX:crowd.p2}%</span>}
            </button>
          ))}
        </div>
        {!showExtra
          ? <button className="exl" onClick={()=>setOpenExtra(o=>({...o,[m.id]:true}))}>+ εξτρα επιλογη</button>
          : <div className="exg">
              {[["GG","GG"],["NG","NG"],["OV","OVER 2.5"],["UN","UNDER 2.5"]].map(([k,l])=>(
                <button key={k} className={`b xb${v.extra===k?` on${ew===true?" ok":ew===false?" no":""}`:""}${locked?" lk":""}`}
                  onClick={()=>!locked&&vote(m,"extra",k)}>
                  <span className="b-x">{l}</span>
                  {crowd&&crowd.ne>0&&<span className="b-p">{crowd.ex[k]}%</span>}
                </button>
              ))}
            </div>}
        {locked&&renderReveal(m.id)}
      </div>
    );
  }

  function renderReveal(matchId){
    const rows=board.map(u=>({n:u.username,v:findVote(predictions[u.id],matchId)})).filter(r=>r.v&&(r.v.pick||r.v.extra));
    if(!rows.length)return null;
    return(<div key={matchId+"-rv"} className="reveal"><div className="reveal-h">👥 Τι ψηφισαν ({rows.length})</div>
      <div className="reveal-l">{rows.map((r,i)=>(
        <span key={i} className="rchip">{r.n}: <b>{r.v.pick||"—"}</b>{r.v.extra&&<em> {r.v.extra}</em>}</span>
      ))}</div></div>);
  }

  function renderPredict(){
    const dts=datesOf[comp];
    const auto = dts.includes(activeDate) ? activeDate : (dts.find(d=>d>=activeDate)||dts[dts.length-1]);
    const shown = (viewDate&&dts.includes(viewDate)) ? viewDate : auto;
    const idx = dts.indexOf(shown);
    const ms = matchesOn(comp,shown,SCH);
    const md = MD_BY_ID[ms[0]?.id] || "—";
    const future = shown>activeDate;

    let premiere=null;
    if(future&&ms.length){
      const t=kickoff(ms[0].id)||"22:00";
      const [hh,mm]=t.split(":").map(Number);
      const diff=new Date(`${shown}T${pad2(hh)}:${pad2(mm)}:00`).getTime()-gNow.getTime();
      if(diff>0){const mins=Math.floor(diff/60000);
        premiere={d:Math.floor(mins/1440),h:Math.floor((mins%1440)/60),m:mins%60};}
    }
    const votedN=ms.filter(m=>findVote(myPreds,m.id)?.pick).length;
    const dayP=dayPoints(shown,myPreds,results,comp,crowdMap,SCH);

    // ομαδοποιηση ανα ωρα εναρξης
    const slots={};
    ms.forEach(m=>{ (slots[kickoff(m.id)||"—"] ??= []).push(m); });
    const slotKeys=Object.keys(slots).sort();

    return(<>
      <div className="top">
        <button className="navb" disabled={idx<=0} onClick={()=>setViewDate(dts[idx-1])}>‹</button>
        <div className="topc">
          <div className="topt">ΑΓΩΝΙΣΤΙΚΗ {md}</div>
          <div className="topd">{caps(fmtLong(shown))}</div>
        </div>
        <button className="navb" disabled={idx>=dts.length-1} onClick={()=>setViewDate(dts[idx+1])}>›</button>
      </div>
      <div className="strip">
        {ms.length} ματς · <b>{votedN}</b> ψηφισες · <b>{dayP>0?`+${dayP}`:dayP}</b> ποντοι
        <button className="infob" onClick={()=>setShowRules(v=>!v)}>{showRules?"×":"i"}</button>
        {shown!==activeDate&&<button className="todayb" onClick={()=>setViewDate(null)}>σημερα</button>}
      </div>
      {showRules&&(
        <div className="rules">
          <div><b>+2</b> σωστη βασικη · <b>−1</b> λαθος</div>
          <div><b>+1</b> σωστη εξτρα · <b>−1</b> λαθος · 0 αν δεν παιξεις</div>
          <div>🎖️ <b>+1</b> αν τη βασικη την ειχε ψηφισει &lt;25% της παρεας</div>
          <div className="rules-l">🔒 Αλλαζεις ελευθερα μεχρι 15′ πριν τη σεντρα</div>
        </div>
      )}
      {premiere&&(
        <div className="prem">
          <div className="prem-glow"/>
          <div className="prem-lbl">{COMPS[comp].icon} ΞΕΚΙΝΑΕΙ ΣΕ</div>
          <div className="prem-clock">
            <div className="pc"><b>{premiere.d}</b><span>ΜΕΡΕΣ</span></div>
            <div className="pc"><b>{premiere.h}</b><span>ΩΡΕΣ</span></div>
            <div className="pc"><b>{premiere.m}</b><span>ΛΕΠΤΑ</span></div>
          </div>
        </div>
      )}
      {ms.length===0
        ? <div className="empty"><div className="e-i">{COMPS[comp].icon}</div><h3>ΔΕΝ ΕΧΕΙ ΜΑΤΣ</h3><p>Διαλεξε αλλη αγωνιστικη απο τα βελακια.</p></div>
        : slotKeys.map(k=>{
            const cd=lockIn(slots[k][0].id,shown);
            return(<div key={k}>
              <div className="slot">
                <span className="slot-t">{k}</span>
                <span className="slot-l"/>
                <span className={`slot-c${cd?.urgent?" urg":""}`}>{cd?`κλειδωνει σε ${cd.txt}`:"κλειδωμενο"}</span>
              </div>
              {slots[k].map(m=>matchCard(m))}
            </div>);
          })}
    </>);
  }

  function renderLeaderboard(){
    const myB=me?computeBadges(myPreds,results,board[0]?.id===me.id):[];
    const val=u=>lbComp==="ALL"?u.total:lbComp==="UCL"?u.ucl:u.uel;
    return(<>
      <div className="ptop2">
        <div><div className="ptitle">ΚΑΤΑΤΑΞΗ</div><div className="psub">{users.length} παικτες</div></div>
        <button className="share-b" onClick={shareLeaderboard} disabled={sharing}>{sharing?"...":"📤"}</button>
      </div>
      <div className="segs">
        {[["ALL","Συνολικα"],["UCL","⭐ Champions"],["UEL","🔶 Europa"]].map(([k,l])=>(
          <button key={k} className={`seg${lbComp===k?" on":""}`} onClick={()=>setLbComp(k)}>{l}</button>))}
      </div>
      {mvp&&(
        <div className="mvp">
          <div className="mvp-ic">🏅</div>
          <div className="mvp-tx">
            <div className="mvp-l">ΠΑΙΚΤΗΣ ΤΗΣ ΑΓΩΝΙΣΤΙΚΗΣ · {fmtShort(mvp.date)}</div>
            <div className="mvp-n">{mvp.names.join(" & ")}</div>
          </div>
          <div className="mvp-p">+{mvp.pts}</div>
        </div>
      )}
      {myB.length>0&&<div className="mybadges"><div className="mb-h">Τα παρασημα μου</div>
        <div className="mb-r">{myB.map((b,i)=><span key={i} className="badge">{b.i} {b.n}</span>)}</div></div>}
      {board.length>=3&&val(board[0])!==0&&(
        <div className="podium">
          {[1,0,2].map(pi=>{const u=board[pi];if(!u)return null;
            const place=pi+1, p=val(u);
            return(<div key={u.id} className={`pod p${place}${u.id===me?.id?" mine":""}`}>
              <div className="pod-m">{place===1?"🥇":place===2?"🥈":"🥉"}</div>
              <div className="pod-av">{u.username.slice(0,2).toUpperCase()}</div>
              <div className="pod-n">{u.username}</div>
              <div className={`pod-p ${p<0?"neg":""}`}>{p>0?`+${p}`:p}</div>
              <div className="pod-b"/>
            </div>);})}
        </div>
      )}
      <div className="lbcard"><table className="lbt">
        <thead><tr><th>#</th><th>Παικτης</th><th>Ποντοι</th></tr></thead>
        <tbody>{board.map((u,i)=>{
          const p=val(u);
          return(<tr key={u.id} className={u.id===me?.id?"me":""}>
            <td><span className={`rnk${i<3?" top":""}`}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</span>
              {(()=>{const pr=prevRank[u.id];if(!pr)return null;const d=pr-(i+1);
                if(d>0)return <span className="mv up">▲{d}</span>;
                if(d<0)return <span className="mv dn">▼{-d}</span>;
                return <span className="mv eq">–</span>;})()}
            </td>
            <td><span className="un">{u.username}{u.id===me?.id&&<span className="mb">ΕΣΥ</span>}{u.isAdmin&&" ⚙"}</span></td>
            <td><span className={`tp ${p>0?"pos":p<0?"neg":""}`}>{p>0?`+${p}`:p}</span></td>
          </tr>);})}</tbody>
      </table></div>
    </>);
  }

  function renderHistory(){
    const days=ALL_DATES.filter(d=>d<=activeDate&&SCHEDULE.some(m=>m.date===d&&findVote(myPreds,m.id))).reverse();
    const st=playerStats(myPreds,results);
    return(<>
      <div className="ptitle">ΤΟ ΙΣΤΟΡΙΚΟ ΜΟΥ</div>
      <div className="stats4">
        <div className="s4"><div className="s4n gd">{st.correct}</div><div className="s4l">Σωστα</div></div>
        <div className="s4"><div className="s4n rd">{st.wrong}</div><div className="s4l">Λαθος</div></div>
        <div className="s4"><div className="s4n">{st.pct}%</div><div className="s4l">Ευστοχια</div></div>
        <div className="s4"><div className="s4n or">{voteStreak(myPreds)}🔥</div><div className="s4l">Σερι</div></div>
      </div>
      <div className="stats4" style={{marginTop:".5rem"}}>
        <div className="s4"><div className="s4n gd">{st.exCorrect}</div><div className="s4l">Εξτρα σωστα</div></div>
        <div className="s4"><div className="s4n rd">{st.exWrong}</div><div className="s4l">Εξτρα λαθος</div></div>
      </div>
      {days.length===0&&<div className="empty" style={{marginTop:"1rem"}}><div className="e-i">📋</div><h3>ΑΚΟΜΑ ΤΙΠΟΤΑ</h3><p>Μολις ψηφισεις θα εμφανιστουν εδω.</p></div>}
      {days.map(d=>{
        const ms=SCHEDULE.filter(m=>m.date===d&&findVote(myPreds,m.id));
        const dp=dayPoints(d,myPreds,results,null,crowdMap,SCH);
        return(<div key={d} className="hday">
          <div className="hh"><span>{caps(fmtLong(d))}</span><span className={`hp ${dp>0?"pos":dp<0?"neg":""}`}>{dp>0?`+${dp}`:dp}</span></div>
          {ms.map(m=>{const v=findVote(myPreds,m.id),r=results[m.id];const o=outcome1X2(r),ex=outcomeExtra(r);
            return(<div key={m.id} className="hr">
              <span className="hm">{COMPS[m.comp].icon} {m.home.slice(0,11)} – {m.away.slice(0,11)}</span>
              <span className="hpk">
                <b className={r?(v.pick===o?"ok":"no"):""}>{v.pick||"—"}</b>
                {v.extra&&<em className={r?(ex[v.extra]?"ok":"no"):""}>{v.extra}</em>}
              </span>
            </div>);})}
        </div>);
      })}
    </>);
  }

  function renderAdmin(){
    const dates=datesOf[comp];
    const ms=matchesOn(comp,adminDate,SCH);
    return(<>
      <div className="ptitle">ADMIN · {COMPS[comp].short}</div>
      <div className="atabs">{[["results","Σκορ"],["missing","Ψηφοι"],["users","Χρηστες"]].map(([k,l])=>(
        <button key={k} className={`atab${adminTab===k?" on":""}`} onClick={()=>setAdminTab(k)}>{l}</button>))}</div>
      {adminTab==="results"&&(<>
        <div className="info">⚡ Τα αποτελεσματα ερχονται <b>αυτοματα</b> (ESPN) καθε 3 λεπτα οσο παιζουν ματς. Το κουμπι πιο κατω τα τραβαει αμεσως. Αν κατι λειψει, γραψε το σκορ με το χερι.</div>
        <button className="sync-b" onClick={()=>syncLive(adminDate,true)} disabled={syncing}>
          {syncing?"⏳ Ανακτηση...":"🔄 Ανακτηση αποτελεσματων"}
        </button>
        {lastSync&&<div className="sync-t">Τελευταιος συγχρονισμος: {new Date(lastSync).toLocaleTimeString("el-GR")}</div>}
        <button className="logo-b" onClick={harvestLogos} disabled={syncing}>🖼️ Κατεβασε λογοτυπα ομαδων ({Object.keys(logos).length}/72)</button>
        <div className="dstrip">{dates.map(d=><button key={d} className={`dtab${d===adminDate?" on":""}`} onClick={()=>setAdminDate(d)}>{fmtShort(d)}</button>)}</div>
        <div className="asec"><div className="asec-h">{fmtLong(adminDate)}</div>
          {ms.map(m=>{
            const r=results[m.id];
            const dh=scoreDraft[m.id]?.h ?? (r?String(r.h):"");
            const da=scoreDraft[m.id]?.a ?? (r?String(r.a):"");
            return(<div key={m.id} className="ar">
              <div className="ar-t">{F(m.home)} {m.home} – {m.away} {F(m.away)}</div>
              <div className="ar-in">
                <input className="sc" type="number" min="0" value={dh} onChange={e=>setScoreDraft(s=>({...s,[m.id]:{...s[m.id],h:e.target.value}}))}/>
                <span className="sc-d">–</span>
                <input className="sc" type="number" min="0" value={da} onChange={e=>setScoreDraft(s=>({...s,[m.id]:{...s[m.id],a:e.target.value}}))}/>
                <button className="sc-b" onClick={()=>saveScore(m.id,dh,da)}>✓</button>
                {r&&<button className="sc-x" onClick={()=>{saveScore(m.id,"","");setScoreDraft(s=>({...s,[m.id]:{h:"",a:""}}));}}>✕</button>}
              </div>
              <div className="ar-mv">
                <span>📅 Μεταφορα:</span>
                <input className="dt" type="date" value={dateOfMatch(m.id)||""} onChange={e=>moveMatch(m.id,e.target.value)}/>
                {matchDates[m.id]&&<button className="sc-x" title="Επαναφορα" onClick={()=>moveMatch(m.id,null)}>↺</button>}
              </div>
            </div>);})}
        </div>
      </>)}
      {adminTab==="missing"&&(()=>{
        const dts=datesOf[comp];
        const d=(viewDate&&dts.includes(viewDate))?viewDate:(dts.includes(activeDate)?activeDate:(dts.find(x=>x>=activeDate)||dts[dts.length-1]));
        const ms=matchesOn(comp,d,SCH);
        const rows=users.map(u=>{
          const p=predictions[u.id]||{};
          const done=ms.filter(m=>findVote(p,m.id)?.pick).length;
          return {u,done,tot:ms.length};
        }).sort((a,b)=>a.done-b.done);
        const missing=rows.filter(r=>r.done<r.tot);
        return(<div className="asec">
          <div className="asec-h">Ψηφοι · {fmtLong(d)}</div>
          <div className="info">Ποιοι δεν εχουν ψηφισει ολα τα ματς της αγωνιστικης — για υπενθυμιση στο Telegram.</div>
          {missing.length===0
            ? <div style={{color:"var(--green)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:".95rem"}}>✓ Ολοι εχουν ψηφισει!</div>
            : missing.map(r=>(
              <div key={r.u.id} className="miss">
                <span className="miss-n">{r.u.username}</span>
                <span className={`miss-c${r.done===0?" zero":""}`}>{r.done}/{r.tot}</span>
              </div>))}
        </div>);
      })()}
      {adminTab==="users"&&(<div className="asec"><div className="asec-h">Μελη ({users.length})</div>
        <div className="info">➕➖ ποντοι · 🗑️ καθαρισμος ψηφων μερας (για να ξαναψηφισει καποιος)</div>
        {users.map(u=>{
          const p=predictions[u.id]||{};
          const days=ALL_DATES.filter(d=>SCHEDULE.some(m=>m.date===d&&findVote({[d]:p[d]},m.id)));
          const sel=clearDaySel[u.id]||days[days.length-1]||"";
          const tot=totalPoints(p,results,null,crowdMap)+(adjustments[u.id]||0);
          return(<div key={u.id} className="ur">
            <div className="ur-l"><span className="ur-n">{u.username}{u.is_admin?" 👑":""}</span>
              <span className={`ur-p ${tot>0?"pos":tot<0?"neg":""}`}>{tot>0?`+${tot}`:tot}</span></div>
            <div className="ur-a">
              <button className="pb minus" onClick={()=>adjustPoints(u.id,-1)}>−1</button>
              <button className="pb plus" onClick={()=>adjustPoints(u.id,1)}>+1</button>
              {days.length>0&&<>
                <select className="dsel" value={sel} onChange={e=>setClearDaySel(s=>({...s,[u.id]:e.target.value}))}>
                  {days.map(d=><option key={d} value={d}>{fmtShort(d)}</option>)}
                </select>
                <button className="pb del" onClick={()=>clearVotes(u.id,sel)}>🗑️</button></>}
              {!u.is_admin&&<button className="pb del" onClick={()=>delUser(u.id)}>✕</button>}
            </div>
          </div>);})}
      </div>)}
    </>);
  }

  if(booting) return(<><style>{CSS}</style><div className={`app c-${comp}`}>
    <header className="hdr"><div className="logo"><img className="logo-img" src={LOGO} alt=""/></div></header>
    <div className="comptabs"><div className="sk sk-tab"/><div className="sk sk-tab"/></div>
    <div className="main">
      <div className="sk sk-hero"/>
      <div className="sk sk-bar"/>
      {[0,1,2].map(i=><div key={i} className="sk sk-card" style={{animationDelay:`${i*.12}s`}}/>)}
    </div></div></>);

  return(<>
    <style>{CSS}</style>
    <div className={`app c-${comp}`}>
      {(view==="login"||view==="register")&&
        <LoginScreen mode={view} setMode={setView} lf={lf} setLf={setLf} rf={rf} setRf={setRf}
          lerr={lerr} rerr={rerr} onLogin={login} onReg={reg} busy={busy}/>}
      {me&&(<>
        <header className="hdr">
          <div className="logo"><img className="logo-img" src={LOGO} alt="Euro Picks"/></div>
          <nav className="nav">
            {[{k:"predict",l:"Ψηφισε"},{k:"leaderboard",l:"Καταταξη"},{k:"history",l:"Ιστορικο"},...(me.is_admin?[{k:"admin",l:"Admin"}]:[])].map(n=>(
              <button key={n.k} className={`nb${view===n.k?" on":""}`} onClick={()=>setView(n.k)}>{n.l}</button>))}
          </nav>
          <div className="hdr-r">
            <div className={`chip ${(myBoard?.total||0)<0?"neg":""}`}>🏅 {myBoard?.total||0}</div>
            <button className="lb2" onClick={logout}>Εξοδος</button>
          </div>
        </header>
        <div className="comptabs">
          {["UCL","UEL"].map(c=>(
            <button key={c} className={`ct ct-${c}${comp===c?" on":""}`} onClick={()=>setComp(c)}>
              {logos["__"+c]
                ? <img className="ct-l" src={logos["__"+c]} alt="" onError={e=>{e.target.style.display="none";}}/>
                : <span className="ct-i">{COMPS[c].icon}</span>}
              {COMPS[c].short}
            </button>))}
        </div>
        <main className="main">
          {view==="predict"&&renderPredict()}
          {view==="leaderboard"&&renderLeaderboard()}
          {view==="history"&&renderHistory()}
          {view==="admin"&&me.is_admin&&renderAdmin()}
        </main>
        <nav className="bnav">
          {[{k:"predict",l:"Ψηφισε",i:"⚽"},{k:"leaderboard",l:"Καταταξη",i:"📊"},{k:"history",l:"Ιστορικο",i:"📋"},...(me.is_admin?[{k:"admin",l:"Admin",i:"⚙️"}]:[])].map(n=>(
            <button key={n.k} className={`bn${view===n.k?" on":""}`} onClick={()=>setView(n.k)}>
              <span className="bn-i">{n.i}</span><span className="bn-l">{n.l}</span></button>))}
        </nav>
      </>)}
      {confetti&&<Confetti/>}
      {toast&&<div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  </>);
}

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--bg:#05070f;--text:#eef2ff;--text2:#a8b0c8;--muted:#6b7490;
--acc:#3b82f6;--acc2:#93c5fd;--accd:#1e40af;--accdim:rgba(59,130,246,0.14);--accbd:rgba(59,130,246,0.38);
--aur1:rgba(59,130,246,.34);--aur2:rgba(147,51,234,.26);
--glass:rgba(255,255,255,.058);--glass2:rgba(255,255,255,.09);--gbd:rgba(255,255,255,.13);
--green:#3ddc84;--red:#ff6b6b;--r:14px;--r2:22px;}
.c-UEL{--bg:#0b0602;--text:#fff4e6;--text2:#c9b295;--muted:#8a7358;
--acc:#ff7a00;--acc2:#ffb066;--accd:#b35400;--accdim:rgba(255,122,0,0.15);--accbd:rgba(255,122,0,0.4);
--aur1:rgba(255,122,0,.32);--aur2:rgba(220,38,38,.2);}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:16px;-webkit-font-smoothing:antialiased;}
.app{min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden;
background:
 radial-gradient(ellipse 70% 45% at 8% 0%, var(--aur1) 0%, transparent 60%),
 radial-gradient(ellipse 65% 40% at 95% 100%, var(--aur2) 0%, transparent 62%),
 var(--bg);
background-attachment:fixed;transition:background .4s;}
.hdr,.comptabs,.main,.bnav{position:relative;z-index:1;}
.boot{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;min-height:100vh;}
.bb{font-size:3rem;animation:bs 1.2s ease-in-out infinite;}
@keyframes bs{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-12px) rotate(180deg)}}
.bt{font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:700;letter-spacing:4px;color:var(--acc2);}
/* LOGIN */
.login-fs{position:fixed;inset:0;z-index:500;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:#070a14;}
.lf-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.5;}
.lf-o1{width:260px;height:260px;background:rgba(59,130,246,.35);top:8%;left:-8%;animation:f1 9s ease-in-out infinite;}
.lf-o2{width:220px;height:220px;background:rgba(255,122,0,.3);bottom:10%;right:-6%;animation:f2 11s ease-in-out infinite;}
@keyframes f1{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-30px)}}
@keyframes f2{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,25px)}}
.lf-scan{position:absolute;left:0;right:0;height:150px;background:linear-gradient(180deg,transparent,rgba(147,197,253,.05),transparent);animation:sc 6s linear infinite;}
@keyframes sc{from{top:-150px}to{top:100%}}
.login-box{position:relative;z-index:2;width:100%;max-width:380px;background:rgba(18,23,41,.75);backdrop-filter:blur(24px);
border:1px solid rgba(147,197,253,.25);border-radius:20px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.75);animation:bi .6s cubic-bezier(.2,.8,.2,1) both;}
@keyframes bi{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.login-bar{height:4px;background:linear-gradient(90deg,#3b82f6,#93c5fd,#ff7a00,#ffb066);background-size:300% 100%;animation:bar 4s ease infinite;}
@keyframes bar{0%,100%{background-position:0 0}50%{background-position:100% 0}}
.login-head{padding:2rem 1.8rem 1.3rem;text-align:center;border-bottom:1px solid rgba(255,255,255,.06);}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.login-logo{width:78%;max-width:250px;height:auto;display:block;margin:0 auto .5rem;
filter:brightness(1.3) saturate(1.1) drop-shadow(0 0 26px rgba(59,130,246,.5)) drop-shadow(0 4px 10px rgba(0,0,0,.6));
animation:fl 4s ease-in-out infinite;}
.login-title2{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:700;letter-spacing:3px;color:#eef2ff;margin-top:.3rem;}
.login-sub{font-family:'Barlow Condensed',sans-serif;color:#6b7490;font-size:.8rem;letter-spacing:3px;margin-top:.25rem;font-weight:600;}
.login-body{padding:1.5rem 1.8rem 1.9rem;}
.lerr{background:rgba(255,107,107,.12);border:1px solid rgba(255,107,107,.3);border-radius:9px;padding:.55rem .8rem;margin-bottom:.9rem;color:#ff6b6b;font-size:.82rem;text-align:center;}
.lfield{margin-bottom:.9rem;}
.lfield label{display:block;font-family:'Barlow Condensed',sans-serif;font-size:.78rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7490;margin-bottom:.35rem;}
.lfield input{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.13);border-radius:10px;color:#eef2ff;font-size:.95rem;padding:.75rem .95rem;outline:none;transition:.2s;}
.lfield input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.15);}
.login-submit{width:100%;margin-top:.4rem;background:linear-gradient(135deg,#1e40af,#3b82f6);border:none;border-radius:10px;
font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.05rem;letter-spacing:3px;color:#fff;padding:.85rem;cursor:pointer;transition:.2s;box-shadow:0 6px 22px rgba(59,130,246,.35);}
.login-submit:hover{filter:brightness(1.12);transform:translateY(-1px);}
.login-submit:disabled{opacity:.6;cursor:wait;}
.lsw{text-align:center;margin-top:1rem;color:#6b7490;font-size:.85rem;}
.lsw button{background:none;border:none;color:#93c5fd;font-weight:600;cursor:pointer;font-size:.85rem;text-decoration:underline;text-underline-offset:3px;}
.lhint{text-align:center;margin-top:.7rem;color:#4b5468;font-size:.7rem;}
/* HEADER */
.hdr{position:sticky;top:0;z-index:200;height:56px;padding:0 .9rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem;
background:rgba(12,16,30,.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
border-bottom:1px solid var(--gbd);box-shadow:0 1px 0 rgba(255,255,255,.06) inset;}
.c-UEL .hdr{background:rgba(20,12,4,.82);}
.logo{display:flex;align-items:center;flex-shrink:0;}
.logo-img{height:34px;width:auto;display:block;
filter:brightness(1.32) saturate(1.12) drop-shadow(0 0 12px rgba(59,130,246,.55)) drop-shadow(0 2px 4px rgba(0,0,0,.6));}
.c-UEL .logo-img{filter:brightness(1.32) saturate(1.12) drop-shadow(0 0 12px rgba(255,122,0,.5)) drop-shadow(0 2px 4px rgba(0,0,0,.6));}
.ld{width:8px;height:8px;border-radius:50%;background:var(--acc);box-shadow:0 0 10px var(--acc);animation:pl 1.8s infinite;}
@keyframes pl{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
.nav{display:flex;gap:2px;}
.nb{background:none;border:none;font-family:'Barlow Condensed',sans-serif;font-size:.95rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--muted);cursor:pointer;padding:.35rem .6rem;border-radius:7px;}
.nb.on{color:var(--acc2);background:var(--accdim);}
.hdr-r{display:flex;align-items:center;gap:.4rem;flex-shrink:0;}
.chip{background:var(--accdim);border:1px solid var(--accbd);border-radius:20px;padding:.22rem .65rem;font-weight:700;font-size:.82rem;color:var(--acc2);white-space:nowrap;}
.chip.neg{background:rgba(255,107,107,.12);border-color:rgba(255,107,107,.3);color:var(--red);}
.lb2{background:none;border:1px solid rgba(255,255,255,.12);color:var(--muted);font-family:'Barlow Condensed',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:.24rem .5rem;border-radius:6px;cursor:pointer;}
.lb2:hover{border-color:var(--red);color:var(--red);}
/* COMP TABS */
.comptabs{position:sticky;top:56px;z-index:190;display:flex;gap:.45rem;padding:.6rem .9rem;
background:rgba(12,16,30,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);}
.c-UEL .comptabs{background:rgba(20,12,4,.78);}
.ct{flex:1;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.65rem;border-radius:14px;cursor:pointer;
font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
background:var(--glass);border:1px solid var(--gbd);color:var(--muted);
transition:background .15s,border-color .15s,color .15s,box-shadow .15s;}
.ct:active{background:rgba(255,255,255,.12);}
.ct-i{font-size:1.1rem;}
.ct-l{height:24px;width:auto;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5));transition:transform .25s,filter .25s;}
.ct.on .ct-l{transform:scale(1.12);filter:drop-shadow(0 0 10px rgba(255,255,255,.35));}
.ct:not(.on) .ct-l{opacity:.55;}
.ct-UCL.on{background:linear-gradient(135deg,rgba(30,64,175,.5),rgba(59,130,246,.25));border-color:#3b82f6;color:#bfdbfe;box-shadow:0 4px 18px rgba(59,130,246,.28);}
.ct-UEL.on{background:linear-gradient(135deg,rgba(179,84,0,.5),rgba(255,122,0,.25));border-color:#ff7a00;color:#ffd0a0;box-shadow:0 4px 18px rgba(255,122,0,.28);}
.main{flex:1;padding:.9rem;max-width:600px;margin:0 auto;width:100%;}
.ptitle{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:700;letter-spacing:1.5px;color:var(--text);margin-bottom:.15rem;}
.psub{font-family:'Barlow Condensed',sans-serif;color:var(--muted);font-size:.85rem;letter-spacing:.5px;}
.ptop2{display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.8rem;}
/* HERO */
.hero{position:relative;overflow:hidden;display:flex;align-items:center;gap:.9rem;padding:1.05rem 1.15rem;margin-bottom:.85rem;border-radius:var(--r2);
background:var(--glass2);
border:1px solid var(--gbd);box-shadow:0 12px 36px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.14);
animation:rise .5s cubic-bezier(.2,.8,.2,1) both;}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.hero-glow{position:absolute;top:-60%;right:-10%;width:55%;height:200%;background:radial-gradient(ellipse,var(--accdim),transparent 70%);animation:hg 4s ease-in-out infinite;}
@keyframes hg{0%,100%{opacity:.6}50%{opacity:1}}
.hero-ic{font-size:2.4rem;flex-shrink:0;z-index:1;animation:fl 3s ease-in-out infinite;}
.hero-tx{z-index:1;flex:1;min-width:0;}
.hero-eye{font-family:'Barlow Condensed',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:2.5px;color:var(--acc2);}
.hero-t{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:700;letter-spacing:1px;color:var(--text);line-height:1.05;}
.hero-tag{font-family:'Barlow Condensed',sans-serif;font-size:.75rem;font-weight:600;letter-spacing:1px;color:var(--muted);}
.hero-pts{text-align:center;z-index:1;flex-shrink:0;}
.hp-n{font-size:1.9rem;font-weight:800;color:var(--acc2);line-height:1;}
.hp-l{font-family:'Barlow Condensed',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:1.5px;color:var(--muted);}
.lockbar{font-family:'Barlow Condensed',sans-serif;font-size:.84rem;letter-spacing:.4px;color:var(--acc2);
background:var(--glass);border:1px solid var(--gbd);border-radius:12px;
padding:.5rem .8rem;margin-bottom:.9rem;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);}
.lb-rules{display:flex;flex-wrap:wrap;justify-content:center;gap:.3rem .55rem;margin-top:.35rem;
font-size:.76rem;color:var(--text2);}
.lb-rules span{white-space:nowrap;background:rgba(255,255,255,.05);border-radius:6px;padding:.06rem .4rem;}
.lb-rules b{color:var(--acc2);}
.mc-udg{display:inline-flex;align-items:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;
font-size:.68rem;letter-spacing:.8px;padding:.14rem .5rem;border-radius:6px;
background:linear-gradient(135deg,rgba(255,215,0,.22),rgba(255,140,0,.16));
border:1px solid rgba(255,200,0,.45);color:#ffd76a;box-shadow:0 0 14px rgba(255,200,0,.2);
animation:udgIn .5s cubic-bezier(.34,1.56,.64,1) both;}
@keyframes udgIn{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
/* MATCH CARD */
.mc{position:relative;background:var(--glass);
border:1px solid var(--gbd);border-radius:var(--r2);margin-bottom:.85rem;overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.12);
transition:border-color .2s,box-shadow .2s;contain:layout paint;}
.mc::before{content:'';position:absolute;top:0;left:12%;right:12%;height:1px;
background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);}
.mc.voted{border-color:var(--accbd);box-shadow:0 10px 30px rgba(0,0,0,.38),0 0 26px var(--accdim),inset 0 1px 0 rgba(255,255,255,.14);}
.mc.won{border-color:rgba(61,220,132,.55);box-shadow:0 10px 30px rgba(0,0,0,.38),0 0 30px rgba(61,220,132,.18),inset 0 1px 0 rgba(255,255,255,.14);}
.mc.lost{border-color:rgba(255,107,107,.42);}
.mc-top{display:flex;align-items:center;justify-content:space-between;padding:.55rem .8rem .2rem;}
.mc-time{font-family:'Barlow Condensed',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.5px;color:var(--acc2);}
.mc-score{font-weight:800;font-size:.85rem;padding:.1rem .5rem;border-radius:6px;}
.mc-score.g{background:rgba(61,220,132,.15);color:var(--green);}
.mc-score.r{background:rgba(255,107,107,.13);color:var(--red);}
.mc-score.n{background:rgba(255,255,255,.06);color:var(--text2);}
.mc-live{display:inline-flex;align-items:center;gap:.32rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;
font-size:.8rem;letter-spacing:.5px;padding:.12rem .5rem;border-radius:6px;background:rgba(255,60,60,.15);
border:1px solid rgba(255,60,60,.4);color:#ff6b6b;}
.mc-live i{width:7px;height:7px;border-radius:50%;background:#ff3c3c;animation:lp 1.2s infinite;}
@keyframes lp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
.sync-b{width:100%;margin-bottom:.5rem;padding:.6rem;border-radius:10px;cursor:pointer;
font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
background:linear-gradient(135deg,var(--accd),var(--acc));border:none;color:#fff;box-shadow:0 4px 16px var(--accdim);}
.sync-b:hover{filter:brightness(1.1);}
.sync-b:disabled{opacity:.6;cursor:wait;}
.sync-t{font-family:'Barlow Condensed',sans-serif;font-size:.78rem;color:var(--muted);text-align:center;margin-bottom:.7rem;}
.logo-b{width:100%;margin-bottom:.7rem;padding:.5rem;border-radius:10px;cursor:pointer;
font-family:'Barlow Condensed',sans-serif;font-size:.88rem;font-weight:700;letter-spacing:1px;
background:var(--glass);border:1px solid var(--gbd);color:var(--text2);}
.logo-b:hover{border-color:var(--accbd);color:var(--acc2);}
.logo-b:disabled{opacity:.55;cursor:wait;}
/* ── ΒΑΘΡΟ ── */
.podium{display:flex;align-items:flex-end;justify-content:center;gap:.5rem;margin-bottom:1rem;}
.pod{flex:1;position:relative;display:flex;flex-direction:column;align-items:center;gap:.25rem;padding:.8rem .3rem .5rem;
border-radius:18px 18px 0 0;background:var(--glass);border:1px solid var(--gbd);border-bottom:none;
box-shadow:inset 0 1px 0 rgba(255,255,255,.14);animation:podin .55s cubic-bezier(.2,.8,.2,1) both;}
@keyframes podin{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.pod.p1{padding-top:1.1rem;animation-delay:.1s;border-color:rgba(255,215,0,.42);box-shadow:0 0 26px rgba(255,215,0,.14),inset 0 1px 0 rgba(255,255,255,.18);}
.pod.p2{animation-delay:0s;}
.pod.p3{animation-delay:.2s;}
.pod.mine{background:var(--accdim);}
.pod-m{font-size:1.5rem;line-height:1;}
.pod.p1 .pod-m{font-size:1.9rem;}
.pod-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;
font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.05rem;letter-spacing:.5px;color:var(--text);
background:linear-gradient(140deg,rgba(255,255,255,.18),rgba(255,255,255,.06));border:1px solid rgba(255,255,255,.2);}
.pod.p1 .pod-av{width:52px;height:52px;font-size:1.25rem;border-color:rgba(255,215,0,.5);}
.pod-n{font-family:'Barlow Condensed',sans-serif;font-size:.85rem;font-weight:700;color:var(--text);text-align:center;
max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pod-p{font-weight:800;font-size:1.15rem;color:var(--acc2);}
.pod-p.neg{color:var(--red);}
.pod-b{width:100%;margin-top:.35rem;border-radius:6px 6px 0 0;background:linear-gradient(180deg,rgba(255,255,255,.14),transparent);}
.pod.p1 .pod-b{height:34px;}.pod.p2 .pod-b{height:22px;}.pod.p3 .pod-b{height:14px;}
.mc-head{display:flex;align-items:center;justify-content:center;gap:.7rem;padding:.5rem .8rem .7rem;}
.mc-side{flex:1;display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:0;}
.tb{width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:50%;
background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);
box-shadow:0 4px 14px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.2);transition:transform .25s;}
.mc:hover .tb{transform:translateY(-2px) scale(1.04);}
.tb img{width:34px;height:34px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4));}
.tb-f{font-size:1.7rem;line-height:1;}
.mc-team{font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:600;color:var(--text);text-align:center;line-height:1.1;}
.mc-vs{font-family:'Barlow Condensed',sans-serif;font-size:.85rem;font-weight:700;color:var(--muted);flex-shrink:0;}
.mc-lbl{display:flex;align-items:center;gap:.4rem;font-family:'Barlow Condensed',sans-serif;font-size:.7rem;font-weight:700;
letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);padding:.25rem .85rem .3rem;}
.mc-opt{font-size:.62rem;background:rgba(255,255,255,.06);padding:.05rem .35rem;border-radius:4px;letter-spacing:.5px;}
.mc-pt{margin-left:auto;color:var(--acc2);}
.mc-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.35rem;padding:0 .7rem .55rem;}
.mc-row4{display:grid;grid-template-columns:1fr 1fr;gap:.35rem;padding:0 .7rem .55rem;}
.vb-sub{font-family:'Barlow Condensed',sans-serif;font-size:.6rem;color:var(--muted);letter-spacing:.2px;}
.vb{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1rem;min-height:60px;
background:rgba(255,255,255,.05);border:1px solid var(--gbd);border-radius:14px;cursor:pointer;
box-shadow:inset 0 1px 0 rgba(255,255,255,.1);
transition:background .12s ease,border-color .12s ease,color .12s ease;
-webkit-tap-highlight-color:transparent;}
.vb-k{font-size:1.45rem;font-weight:800;color:var(--text2);line-height:1;}
.vb-s{font-family:'Barlow Condensed',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.8px;color:var(--muted);}
.vb-x{font-family:'Barlow Condensed',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.5px;color:var(--text2);}
.vb-p{font-family:'Barlow Condensed',sans-serif;font-size:.6rem;font-weight:700;color:var(--muted);}
.xb{min-height:54px;gap:.05rem;}
/* πατημα: μονο σκουραινει, ΚΑΜΙΑ κινηση */
.vb:active:not(.lk){background:rgba(255,255,255,.13);}

/* ── ΕΠΙΛΕΓΜΕΝΟ: γεματο ανοιχτο, σκουρα γραμματα — φωναζει ── */
.vb.sel{background:linear-gradient(170deg,#ffffff,#dfe5f2);border-color:#ffffff;
box-shadow:0 0 0 2px rgba(255,255,255,.28),0 6px 18px rgba(0,0,0,.45);}
.vb.sel .vb-k,.vb.sel .vb-x{color:#0d1220;}
.vb.sel .vb-s,.vb.sel .vb-sub{color:#3d4664;}
.vb.sel .vb-p{color:#5a6480;}
/* τικ επιβεβαιωσης */
.vb.sel::before{content:'✓';position:absolute;top:-7px;right:-7px;width:22px;height:22px;border-radius:50%;
display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:800;
background:#0d1220;color:#fff;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.5);}
.c-UEL .vb.sel::before{background:#160d03;}

/* ── ΜΕΤΑ ΤΟ ΑΠΟΤΕΛΕΣΜΑ ── */
.vb.sel.ok{background:linear-gradient(170deg,#43e08c,#2bb46b);border-color:#7ef0b4;
box-shadow:0 0 0 2px rgba(67,224,140,.3),0 6px 18px rgba(0,0,0,.45);}
.vb.sel.ok .vb-k,.vb.sel.ok .vb-x{color:#04240f;}
.vb.sel.ok .vb-s,.vb.sel.ok .vb-sub,.vb.sel.ok .vb-p{color:#0a3d1e;}
.vb.sel.ok::before{content:'✓';background:#04240f;border-color:#7ef0b4;color:#7ef0b4;}
.vb.sel.no{background:linear-gradient(170deg,#ff6b6b,#d84545);border-color:#ffa5a5;
box-shadow:0 0 0 2px rgba(255,107,107,.28),0 6px 18px rgba(0,0,0,.45);}
.vb.sel.no .vb-k,.vb.sel.no .vb-x{color:#2b0606;}
.vb.sel.no .vb-s,.vb.sel.no .vb-sub,.vb.sel.no .vb-p{color:#4d0f0f;}
.vb.sel.no::before{content:'✕';background:#2b0606;border-color:#ffa5a5;color:#ffa5a5;}

.vb.lk{cursor:default;}
.vb.lk:not(.sel){opacity:.3;}
/* REVEAL */
.reveal{border-top:1px solid rgba(255,255,255,.07);margin:0 .8rem;padding:.55rem 0 .7rem;}
.reveal-h{font-family:'Barlow Condensed',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem;}
.reveal-l{display:flex;flex-wrap:wrap;gap:.3rem;}
.rchip{font-family:'Barlow Condensed',sans-serif;font-size:.75rem;font-weight:600;padding:.16rem .5rem;border-radius:6px;
background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:var(--text2);}
.rchip b{color:var(--acc2);}
.rchip em{font-style:normal;color:var(--muted);font-size:.68rem;margin-left:.2rem;}
/* EMPTY */
.empty{background:var(--glass);border:1px solid var(--gbd);border-radius:var(--r2);
padding:2.6rem 1.5rem;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.12);animation:rise .5s cubic-bezier(.2,.8,.2,1) both;}
.e-i{font-size:2.8rem;margin-bottom:.5rem;}
.empty h3{font-family:'Barlow Condensed',sans-serif;font-size:1.2rem;font-weight:700;letter-spacing:1.5px;color:var(--acc2);margin-bottom:.5rem;}
.empty p{font-family:'Barlow Condensed',sans-serif;color:var(--text2);font-size:.95rem;line-height:1.5;}
/* LEADERBOARD */
.segs{display:flex;gap:.35rem;margin-bottom:.9rem;}
.seg{flex:1;padding:.45rem;border-radius:9px;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:.85rem;font-weight:700;
letter-spacing:.5px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:var(--muted);}
.seg.on{background:var(--accdim);border-color:var(--accbd);color:var(--acc2);}
.share-b{flex-shrink:0;background:var(--accdim);border:1px solid var(--accbd);border-radius:10px;color:var(--acc2);font-size:1.1rem;padding:.4rem .7rem;cursor:pointer;}
.mybadges{background:var(--glass);border:1px solid var(--gbd);border-radius:var(--r2);
padding:.85rem 1rem;margin-bottom:.9rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.12);}
.mb-h{font-family:'Barlow Condensed',sans-serif;font-size:.7rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.45rem;}
.mb-r{display:flex;flex-wrap:wrap;gap:.35rem;}
.badge{font-family:'Barlow Condensed',sans-serif;font-size:.82rem;font-weight:700;color:var(--acc2);background:var(--accdim);border:1px solid var(--accbd);border-radius:20px;padding:.25rem .7rem;}
.lbcard{background:var(--glass);border:1px solid var(--gbd);border-radius:var(--r2);
overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.12);}
.lbt{width:100%;border-collapse:collapse;}
.lbt th{font-family:'Barlow Condensed',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;
color:var(--muted);padding:.6rem .85rem;text-align:left;background:rgba(255,255,255,.04);}
.lbt th:last-child,.lbt td:last-child{text-align:right;}
.lbt tr{border-bottom:1px solid rgba(255,255,255,.04);}
.lbt tr:last-child{border-bottom:none;}
.lbt tr.me{background:var(--accdim);}
.lbt td{padding:.7rem .85rem;}
.rnk{font-weight:700;font-size:1rem;color:var(--muted);}
.rnk.top{font-size:1.15rem;}
.un{font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:600;color:var(--text);}
.mb{font-size:.58rem;background:var(--accdim);color:var(--acc2);border:1px solid var(--accbd);padding:.1rem .35rem;border-radius:4px;margin-left:.35rem;letter-spacing:1px;}
.tp{font-weight:800;font-size:1.1rem;color:var(--text2);}
.tp.pos{color:var(--acc2);}
.tp.neg{color:var(--red);}
/* HISTORY */
.stats4{display:flex;gap:.45rem;margin-top:.8rem;}
.s4{flex:1;background:var(--glass);border:1px solid var(--gbd);border-radius:var(--r);
padding:.65rem .3rem;text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);}
.s4n{font-size:1.25rem;font-weight:800;line-height:1;color:var(--text);}
.s4n.gd{color:var(--green);}.s4n.rd{color:var(--red);}.s4n.or{color:#ff9f45;}
.s4l{font-family:'Barlow Condensed',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--muted);margin-top:.2rem;}
.hday{background:var(--glass);border:1px solid var(--gbd);border-radius:var(--r2);
padding:.85rem 1rem;margin-top:.7rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);}
.hh{display:flex;justify-content:space-between;align-items:center;padding-bottom:.5rem;margin-bottom:.5rem;border-bottom:1px solid rgba(255,255,255,.07);
font-family:'Barlow Condensed',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:.5px;}
.hp{font-weight:800;}
.hp.pos{color:var(--acc2);}.hp.neg{color:var(--red);}
.hr{display:flex;justify-content:space-between;align-items:center;padding:.28rem 0;gap:.5rem;}
.hm{font-family:'Barlow Condensed',sans-serif;font-size:.88rem;color:var(--text2);min-width:0;}
.hpk{display:flex;gap:.3rem;flex-shrink:0;}
.hpk b,.hpk em{font-style:normal;font-weight:700;font-size:.75rem;padding:.12rem .45rem;border-radius:5px;background:rgba(255,255,255,.06);color:var(--text2);}
.hpk .ok{background:rgba(61,220,132,.16);color:var(--green);}
.hpk .no{background:rgba(255,107,107,.14);color:var(--red);}
/* ADMIN */
.atabs{display:flex;gap:.3rem;margin:.8rem 0;}
.atab{flex:1;padding:.4rem;border-radius:8px;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:.9rem;font-weight:700;
letter-spacing:1px;text-transform:uppercase;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:var(--muted);}
.atab.on{background:var(--accdim);border-color:var(--accbd);color:var(--acc2);}
.info{font-family:'Barlow Condensed',sans-serif;background:var(--accdim);border:1px solid var(--accbd);border-radius:9px;padding:.55rem .8rem;margin-bottom:.7rem;color:var(--text2);font-size:.88rem;line-height:1.45;}
.dstrip{display:flex;gap:.3rem;overflow-x:auto;padding-bottom:.3rem;margin-bottom:.7rem;scrollbar-width:none;}
.dstrip::-webkit-scrollbar{display:none;}
.dtab{flex-shrink:0;padding:.3rem .6rem;border-radius:7px;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:.8rem;font-weight:700;
background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:var(--muted);white-space:nowrap;}
.dtab.on{background:var(--accdim);border-color:var(--accbd);color:var(--acc2);}
.asec{background:var(--glass);border:1px solid var(--gbd);border-radius:var(--r2);
padding:.95rem;margin-bottom:.7rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);}
.asec-h{font-family:'Barlow Condensed',sans-serif;font-size:.95rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--acc2);margin-bottom:.7rem;}
.ar{display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:.45rem 0;border-bottom:1px solid rgba(255,255,255,.05);flex-wrap:wrap;}
.ar:last-child{border-bottom:none;}
.ar-t{font-family:'Barlow Condensed',sans-serif;font-size:.9rem;color:var(--text2);flex:1;min-width:150px;}
.ar-in{display:flex;align-items:center;gap:.25rem;}
.sc{width:42px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);border-radius:7px;color:var(--text);
font-size:.95rem;font-weight:700;padding:.35rem;outline:none;text-align:center;color-scheme:dark;}
.sc:focus{border-color:var(--acc);}
.sc-d{color:var(--muted);font-weight:700;}
.sc-b{background:rgba(61,220,132,.14);border:1px solid rgba(61,220,132,.35);color:var(--green);border-radius:7px;padding:.35rem .55rem;cursor:pointer;font-weight:700;}
.sc-x{background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.28);color:var(--red);border-radius:7px;padding:.35rem .5rem;cursor:pointer;}
.ur{padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.05);}
.ur:last-child{border-bottom:none;}
.ur-l{display:flex;justify-content:space-between;align-items:center;}
.ur-n{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1rem;}
.ur-p{font-weight:800;font-size:.95rem;color:var(--text2);}
.ur-p.pos{color:var(--acc2);}.ur-p.neg{color:var(--red);}
.ur-a{display:flex;gap:.3rem;align-items:center;margin-top:.4rem;}
.pb{border-radius:7px;padding:.3rem .55rem;cursor:pointer;font-weight:700;font-size:.82rem;border:1px solid;}
.pb.plus{background:rgba(61,220,132,.12);border-color:rgba(61,220,132,.3);color:var(--green);}
.pb.minus{background:rgba(255,107,107,.1);border-color:rgba(255,107,107,.26);color:var(--red);}
.pb.del{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.12);color:var(--muted);}
.dsel{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.13);border-radius:7px;color:var(--text);
font-family:'Barlow Condensed',sans-serif;font-size:.82rem;padding:.3rem;outline:none;color-scheme:dark;cursor:pointer;}
/* TOAST + CONFETTI */
.toast{position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);font-family:'Barlow Condensed',sans-serif;font-weight:700;
font-size:.9rem;letter-spacing:1.5px;text-transform:uppercase;padding:.5rem 1.2rem;border-radius:9px;z-index:9999;white-space:nowrap;pointer-events:none;}
.toast.ok{background:rgba(61,220,132,.16);border:1px solid rgba(61,220,132,.35);color:var(--green);}
.toast.err{background:rgba(255,107,107,.14);border:1px solid rgba(255,107,107,.3);color:var(--red);}
.confetti-layer{position:fixed;inset:0;z-index:9998;pointer-events:none;overflow:hidden;}
.cpc{position:absolute;top:-20px;border-radius:2px;opacity:.9;animation-name:cf;animation-timing-function:cubic-bezier(.4,.2,.6,1);animation-fill-mode:forwards;}
@keyframes cf{0%{top:-20px;opacity:0}10%{opacity:1}100%{top:105%;opacity:.6}}
/* BOTTOM NAV */
.bnav{display:none;}
.bn{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;cursor:pointer;padding:.35rem 0 .25rem;color:var(--muted);-webkit-tap-highlight-color:transparent;}
.bn-i{font-size:1.3rem;line-height:1;filter:grayscale(.4) opacity(.7);transition:.15s;}
.bn-l{font-family:'Barlow Condensed',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;}
.bn.on{color:var(--acc2);}
.bn.on .bn-i{filter:none;transform:translateY(-1px) scale(1.08);}
@media (max-width:640px){
  .hdr .nav{display:none;}
  .main{padding:.8rem .7rem calc(72px + env(safe-area-inset-bottom,0px));}
  .bnav{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:300;padding:.25rem .3rem calc(.25rem + env(safe-area-inset-bottom,0px));
    background:rgba(12,16,30,.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    border-top:1px solid var(--gbd);box-shadow:0 -1px 0 rgba(255,255,255,.08) inset;}
  .c-UEL .bnav{background:rgba(20,12,4,.9);}
  .toast{bottom:calc(74px + env(safe-area-inset-bottom,0px));}
  .hero-t{font-size:1.3rem;}
  .mc-team{font-size:.92rem;}
}
/* ── ΤΥΠΟΓΡΑΦΙΑ ΣΚΟΡ (broadcast) ── */
.mc-score,.hp-n,.tp,.pod-p,.s4n,.hp,.ur-p,.chip,.vb-k{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.5px;}
.hp-n,.pod-p,.tp{font-weight:700;}
/* ── ΧΡΩΜΑ ΟΜΑΔΑΣ ── */
.mc-cl{position:absolute;left:0;top:0;bottom:0;width:3px;opacity:.85;}
/* ── COUNTDOWN ΚΛΕΙΔΩΜΑΤΟΣ ── */
.mc-cd{font-family:'Barlow Condensed',sans-serif;font-size:.74rem;font-weight:600;letter-spacing:.4px;
color:var(--muted);background:rgba(255,255,255,.05);padding:.1rem .45rem;border-radius:6px;}
.mc-cd.urg{color:#ffb066;background:rgba(255,140,0,.14);border:1px solid rgba(255,140,0,.35);animation:pulseUrg 1.6s infinite;}
@keyframes pulseUrg{0%,100%{opacity:1}50%{opacity:.55}}
/* ── ΣΥΜΠΤΥΓΜΕΝΟ ΕΞΤΡΑ ── */
.ex-toggle{display:flex;align-items:center;justify-content:center;gap:.5rem;width:calc(100% - 1.4rem);
margin:0 .7rem .6rem;padding:.45rem;border-radius:11px;cursor:pointer;background:rgba(255,255,255,.035);
border:1px dashed var(--gbd);color:var(--text2);transition:.18s;}
.ex-toggle span{font-family:'Barlow Condensed',sans-serif;font-size:.85rem;font-weight:700;letter-spacing:1px;}
.ex-toggle em{font-style:normal;font-family:'Barlow Condensed',sans-serif;font-size:.68rem;color:var(--muted);}
.ex-toggle:hover{background:var(--accdim);border-color:var(--accbd);color:var(--acc2);}
.ex-wrap{animation:exIn .3s ease both;}
.mc-edit{font-family:'Barlow Condensed',sans-serif;font-size:.72rem;color:var(--muted);text-align:center;
padding:0 .8rem .55rem;letter-spacing:.3px;}
@keyframes exIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
/* ── ΠΛΟΗΓΗΣΗ ΑΓΩΝΙΣΤΙΚΩΝ ── */
.mdnav{display:flex;align-items:center;gap:.5rem;margin-bottom:.7rem;}
.mdn-b{width:40px;height:40px;flex-shrink:0;border-radius:12px;cursor:pointer;font-size:1.4rem;line-height:1;
background:var(--glass);border:1px solid var(--gbd);color:var(--acc2);transition:.18s;}
.mdn-b:hover:not(:disabled){background:var(--accdim);border-color:var(--accbd);}
.mdn-b:disabled{opacity:.25;cursor:default;}
.mdn-c{flex:1;text-align:center;min-width:0;}
.mdn-t{font-family:'Barlow Condensed',sans-serif;font-size:1.05rem;font-weight:700;letter-spacing:2px;color:var(--acc2);}
.mdn-d{font-family:'Barlow Condensed',sans-serif;font-size:.78rem;color:var(--muted);letter-spacing:.5px;}
.mdn-today{width:100%;margin-bottom:.7rem;padding:.4rem;border-radius:10px;cursor:pointer;
font-family:'Barlow Condensed',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:1px;
background:var(--accdim);border:1px solid var(--accbd);color:var(--acc2);}
/* ── ΟΘΟΝΗ ΠΡΕΜΙΕΡΑΣ ── */
.prem{position:relative;overflow:hidden;text-align:center;padding:1.4rem 1rem 1.2rem;margin-bottom:.85rem;border-radius:var(--r2);
background:var(--glass2);border:1px solid var(--gbd);
box-shadow:0 12px 36px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.14);animation:rise .5s cubic-bezier(.2,.8,.2,1) both;}
.prem-glow{position:absolute;top:-70%;left:50%;transform:translateX(-50%);width:120%;height:200%;
background:radial-gradient(ellipse at center,var(--accdim),transparent 65%);animation:hg 4s ease-in-out infinite;}
.prem-lbl{position:relative;font-family:'Barlow Condensed',sans-serif;font-size:.78rem;font-weight:700;
letter-spacing:3px;color:var(--acc2);margin-bottom:.6rem;}
.prem-clock{position:relative;display:flex;justify-content:center;gap:.5rem;}
.pc{flex:1;max-width:88px;background:rgba(255,255,255,.06);border:1px solid var(--gbd);border-radius:14px;padding:.5rem .2rem;}
.pc b{display:block;font-family:'Oswald',sans-serif;font-size:2rem;font-weight:700;line-height:1;color:var(--text);}
.pc span{font-family:'Barlow Condensed',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:1.5px;color:var(--muted);}
.prem-sub{position:relative;font-family:'Barlow Condensed',sans-serif;font-size:.8rem;color:var(--text2);margin-top:.7rem;line-height:1.35;}
/* ── ΒΕΛΑΚΙΑ ΚΑΤΑΤΑΞΗΣ ── */
.mv{font-family:'Barlow Condensed',sans-serif;font-size:.62rem;font-weight:700;margin-left:.3rem;vertical-align:middle;}
.mv.up{color:var(--green);}.mv.dn{color:var(--red);}.mv.eq{color:var(--muted);opacity:.5;}
/* ── SKELETON ── */
.sk{background:linear-gradient(100deg,rgba(255,255,255,.045) 30%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.045) 70%);
background-size:220% 100%;border-radius:var(--r2);animation:shim 1.4s linear infinite;}
@keyframes shim{from{background-position:120% 0}to{background-position:-120% 0}}
.sk-tab{flex:1;height:44px;border-radius:14px;}
.sk-hero{height:92px;margin-bottom:.85rem;}
.sk-bar{height:56px;margin-bottom:.9rem;border-radius:12px;}
.sk-card{height:200px;margin-bottom:.85rem;}


/* ── ΠΑΙΚΤΗΣ ΤΗΣ ΑΓΩΝΙΣΤΙΚΗΣ ── */
.mvp{display:flex;align-items:center;gap:.8rem;padding:.8rem 1rem;margin-bottom:.9rem;border-radius:var(--r2);
background:linear-gradient(135deg,rgba(255,215,0,.14),rgba(255,255,255,.05));
border:1px solid rgba(255,215,0,.38);box-shadow:0 0 24px rgba(255,215,0,.12),inset 0 1px 0 rgba(255,255,255,.14);}
.mvp-ic{font-size:1.9rem;flex-shrink:0;}
.mvp-tx{flex:1;min-width:0;}
.mvp-l{font-family:'Barlow Condensed',sans-serif;font-size:.66rem;font-weight:700;letter-spacing:1.5px;color:#e0c15a;}
.mvp-n{font-family:'Barlow Condensed',sans-serif;font-size:1.05rem;font-weight:700;color:var(--text);
overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.mvp-p{font-family:'Oswald',sans-serif;font-size:1.4rem;font-weight:700;color:#ffd76a;flex-shrink:0;}
/* ── ADMIN: μεταφορα αγωνα ── */
.ar-mv{display:flex;align-items:center;gap:.4rem;width:100%;margin-top:.35rem;}
.ar-mv span{font-family:'Barlow Condensed',sans-serif;font-size:.72rem;color:var(--muted);}
.dt{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.13);border-radius:7px;
color:var(--text);font-family:'Barlow Condensed',sans-serif;font-size:.8rem;padding:.25rem .4rem;
outline:none;color-scheme:dark;}
.dt:focus{border-color:var(--acc);}
/* ── ADMIN: ποιοι δεν ψηφισαν ── */
.miss{display:flex;align-items:center;justify-content:space-between;padding:.4rem 0;
border-bottom:1px solid rgba(255,255,255,.05);}
.miss:last-child{border-bottom:none;}
.miss-n{font-family:'Barlow Condensed',sans-serif;font-size:.95rem;font-weight:600;color:var(--text);}
.miss-c{font-family:'Oswald',sans-serif;font-size:.9rem;font-weight:600;color:#ffb066;
background:rgba(255,140,0,.12);border:1px solid rgba(255,140,0,.3);border-radius:6px;padding:.05rem .45rem;}
.miss-c.zero{color:var(--red);background:rgba(255,107,107,.12);border-color:rgba(255,107,107,.3);}

/* ═══ ΝΕΑ ΔΙΑΤΑΞΗ ΨΗΦΟΦΟΡΙΑΣ ═══ */
.top{display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem;}
.navb{width:38px;height:38px;flex-shrink:0;border-radius:11px;background:var(--glass);
border:1px solid var(--gbd);color:var(--acc2);font-size:1.3rem;cursor:pointer;transition:background .15s;}
.navb:active:not(:disabled){background:rgba(255,255,255,.12);}
.navb:disabled{opacity:.22;cursor:default;}
.topc{flex:1;text-align:center;min-width:0;}
.topt{font-family:'Barlow Condensed',sans-serif;font-size:1.18rem;font-weight:700;letter-spacing:2px;color:var(--text);line-height:1.1;}
.topd{font-family:'Barlow Condensed',sans-serif;font-size:.76rem;color:var(--muted);letter-spacing:.6px;}
.strip{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:.45rem;margin-bottom:1rem;
font-family:'Barlow Condensed',sans-serif;font-size:.8rem;color:var(--muted);letter-spacing:.4px;}
.strip b{font-family:'Oswald',sans-serif;font-weight:600;color:var(--acc2);}
.infob,.todayb{background:var(--glass);border:1px solid var(--gbd);color:var(--muted);cursor:pointer;
font-family:'Barlow Condensed',sans-serif;font-weight:700;}
.infob{width:20px;height:20px;border-radius:50%;font-size:.7rem;line-height:1;}
.todayb{border-radius:20px;padding:.1rem .55rem;font-size:.72rem;letter-spacing:.5px;color:var(--acc2);}
.rules{background:var(--glass);border:1px solid var(--gbd);border-radius:14px;padding:.7rem .85rem;margin-bottom:1rem;
font-family:'Barlow Condensed',sans-serif;font-size:.84rem;color:var(--text2);line-height:1.65;}
.rules b{color:var(--acc2);font-family:'Oswald',sans-serif;}
.rules-l{margin-top:.35rem;padding-top:.35rem;border-top:1px solid rgba(255,255,255,.07);color:var(--muted);font-size:.78rem;}
/* ── ομαδοποιηση ανα ωρα ── */
.slot{display:flex;align-items:center;gap:.6rem;margin:1.25rem 0 .5rem;}
.slot:first-of-type{margin-top:0;}
.slot-t{font-family:'Oswald',sans-serif;font-size:.98rem;font-weight:600;color:var(--text2);letter-spacing:.5px;}
.slot-l{flex:1;height:1px;background:linear-gradient(90deg,var(--gbd),transparent);}
.slot-c{font-family:'Barlow Condensed',sans-serif;font-size:.72rem;color:var(--muted);white-space:nowrap;}
.slot-c.urg{color:#ffb066;}
/* ── καρτα ── */
.m{position:relative;overflow:hidden;background:var(--glass);border-radius:16px;
padding:.75rem .8rem .5rem;margin-bottom:.5rem;contain:layout paint;transition:background .2s;}
.m::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--cl);}
.m.sel{background:rgba(255,255,255,.085);}
.m.won{background:rgba(61,220,132,.09);}
.m.lost{background:rgba(255,107,107,.07);}
.mr{display:flex;align-items:center;gap:.4rem;margin-bottom:.6rem;}
.side{flex:1;display:flex;align-items:center;gap:.45rem;min-width:0;}
.side.r{justify-content:flex-end;}
.bg{width:42px;height:42px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:50%;
background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);font-size:1.35rem;
box-shadow:0 3px 10px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.16);}
.bg img{width:29px;height:29px;object-fit:contain;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4));}
.nm{font-family:'Barlow Condensed',sans-serif;font-size:.98rem;font-weight:600;color:var(--text);
white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.mmid{display:flex;flex-direction:column;align-items:center;gap:.1rem;flex-shrink:0;min-width:30px;}
.vsx{color:var(--muted);font-size:.9rem;}
.sc2{font-family:'Oswald',sans-serif;font-size:1.05rem;font-weight:700;padding:.02rem .4rem;border-radius:6px;}
.sc2.g{background:rgba(61,220,132,.18);color:var(--green);}
.sc2.r{background:rgba(255,107,107,.15);color:var(--red);}
.sc2.n{background:rgba(255,255,255,.07);color:var(--text2);}
.ptsx{font-family:'Oswald',sans-serif;font-size:.72rem;font-weight:600;}
.ptsx.g{color:var(--green);}.ptsx.r{color:var(--red);}.ptsx.n{color:var(--muted);}
.udg2{font-size:.8rem;}
.lv2{display:inline-flex;align-items:center;gap:.25rem;font-family:'Oswald',sans-serif;font-size:.95rem;font-weight:700;
color:#ff6b6b;background:rgba(255,60,60,.14);border:1px solid rgba(255,60,60,.35);border-radius:6px;padding:.02rem .35rem;}
.lv2 i{width:6px;height:6px;border-radius:50%;background:#ff3c3c;animation:lp 1.2s infinite;}
/* ── κουμπια ── */
.btns{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.3rem;}
.exg{display:grid;grid-template-columns:1fr 1fr;gap:.3rem;margin-top:.35rem;}
.b{position:relative;min-height:48px;border-radius:11px;background:rgba(255,255,255,.05);
border:1px solid var(--gbd);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.05rem;
transition:background .12s,border-color .12s,color .12s;-webkit-tap-highlight-color:transparent;}
.b-k{font-family:'Oswald',sans-serif;font-size:1.2rem;font-weight:600;color:var(--text2);line-height:1;}
.b-x{font-family:'Barlow Condensed',sans-serif;font-size:.85rem;font-weight:700;letter-spacing:.5px;color:var(--text2);}
.b-p{font-family:'Barlow Condensed',sans-serif;font-size:.6rem;font-weight:600;color:var(--muted);}
.xb{min-height:42px;}
.b:active:not(.lk){background:rgba(255,255,255,.13);}
.b.on{background:linear-gradient(170deg,#ffffff,#dfe5f2);border-color:#fff;
box-shadow:0 0 0 2px rgba(255,255,255,.24),0 4px 14px rgba(0,0,0,.4);}
.b.on .b-k,.b.on .b-x{color:#0d1220;}
.b.on .b-p{color:#5a6480;}
.b.on::after{content:'✓';position:absolute;top:-6px;right:-6px;width:19px;height:19px;border-radius:50%;
background:#0d1220;color:#fff;border:2px solid #fff;font-size:.58rem;font-weight:800;
display:flex;align-items:center;justify-content:center;}
.c-UEL .b.on::after{background:#160d03;}
.b.on.ok{background:linear-gradient(170deg,#43e08c,#2bb46b);border-color:#7ef0b4;box-shadow:0 0 0 2px rgba(67,224,140,.28);}
.b.on.ok .b-k,.b.on.ok .b-x{color:#04240f;}
.b.on.ok .b-p{color:#0a3d1e;}
.b.on.ok::after{background:#04240f;border-color:#7ef0b4;color:#7ef0b4;}
.b.on.no{background:linear-gradient(170deg,#ff6b6b,#d84545);border-color:#ffa5a5;box-shadow:0 0 0 2px rgba(255,107,107,.26);}
.b.on.no .b-k,.b.on.no .b-x{color:#2b0606;}
.b.on.no .b-p{color:#4d0f0f;}
.b.on.no::after{content:'✕';background:#2b0606;border-color:#ffa5a5;color:#ffa5a5;}
.b.lk{cursor:default;}
.b.lk:not(.on){opacity:.32;}
.exl{width:100%;margin-top:.4rem;background:none;border:none;color:var(--muted);cursor:pointer;
font-family:'Barlow Condensed',sans-serif;font-size:.78rem;font-weight:600;letter-spacing:.5px;padding:.2rem;}
.exl:hover{color:var(--acc2);}
`;
