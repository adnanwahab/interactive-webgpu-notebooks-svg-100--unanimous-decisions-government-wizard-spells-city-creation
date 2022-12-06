// https://observablehq.com/@bumbeishvili/utils@346
import define1 from "./614a35a3a2a59984@307.js";
import define2 from "./2eeb5b025a05294d@1588.js";
import define3 from "./4a278f0cceddaf4e@225.js";
import define4 from "./7dfec509126263f5@315.js";
import define5 from "./9e07e3a326fcca4c@251.js";
import define6 from "./d229a22b4a9fdc4b@148.js";
import define7 from "./64dc8dde3a12e1b1@124.js";
import define8 from "./75ef0cd619f34b42@491.js";
import define9 from "./5f809d9ac8e83b1b@507.js";
import define10 from "./df43e9bfccb61dab@135.js";
import define11 from "./5dc41b96f4af77ce@295.js";

function _1(md){return(
md`# Utils`
)}

function _2(md){return(
md`### Utils usage - https://beta.observablehq.com/@bumbeishvili/utils-usage`
)}

function _3(md){return(
md`1. Dependency Graph
1. Continents Selector
1. Group By
1. Bar range selector
1. Comments
1. Tablefy
1. Input Grid
1. Persistent select input
1. GLSL tag
1. Wrangle
1. Style Tag
1. Load
1. Empty hierarchy
1. Location Input
`
)}

function _4(md){return(
md`# Dependency Graph`
)}

function _5(md){return(
md`Bottom image is for thumnbail`
)}

function _6(html){return(
html`<img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfEAAADGCAIAAABNWC6LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAADNjSURBVHhe7Z15XE3b+8dLkwYVoejrZo4MmYpESYmUQkXJLFPGCHEvMjabMpNMKZLKPGZI1xAyZZ66IeM15ScZvr/Pba3veZ2bqeGcOsPz/qPXedZae+19dvu817P22Wdvhf8SBEEQsgI5nSAIQnYgpxMEQcgO5HSCIAjZgZxOEAQhO5DTCYIgZAdyOkEQhOxATicIgpAdyOkEQRCyAzmdIAhCdiCnEwRByA7kdIIgCNmBnE4QBCE7kNMJgiBkB3I6QRCE7EBOJwiCkB3I6QRBELIDOZ0gSsrnz59fv3798OHDGzdunDt37sSJE2lpadevX8/Kynr16tWXL194O4IQP+R0gvgFz58/h6Pj4uJCQ0N9fHy6du3aunXrRo0aGRkZVa5cuXz58gq/Qk1NTU9PD+2xFJZ1cHAYOXJkcHDw1q1bz549++zZM74mgigx5HSC+Bc3b95cvnz56NGjnZycGjdurKmpybysra3dtGlTFxcXX1/f+fPnL1myZN26dRD9vn37UlJS0tPTb9++nZ2d/e7dOyTmOTk5T548QQnKUYs2aBkVFRUREYFlJ0yY0LNnz+bNm+vo6LDONTQ0oHtHR8dRo0atWLHi2rVrfGsIooiQ0wl55+vXr5cvX166dGmvXr2QTcOwlSpVQiqNlByJOVx87ty5ly9f8tai5tWrVxcuXIiPjw8LC4PQsV62DVWqVHF1dV28ePHFixexhbw1QfwKcjohj3z+/BmmXrBgQffu3VmyXKNGDS8vr5UrV0pCjoy5wpo1a/r162dkZIRtq1ixYrdu3SD9tLQ0bDlvRBDfg5xOyBe3bt3y9/evWrUqXGlsbOzt7b1x48YHDx7waskjKysrOjp6+PDhDRs2xDZjy/38/G7cuMGrCeLfkNMJuSAnJycqKqp9+/bQooGBweTJk2/fvs3rpIc7d+5MnToV2493YWFhsXbt2nfv3vE6gsiHnE7IOGfOnEEyrqmpqays7OzsnJSUJO2nL7D9u3fv7tGjB96RhobGwIEDU1JSeB0h95DTCZll3759HTp0YOdYgoODnz59yitkBbyjsLAwvDuWtmO44hWEHENOJ2SQnTt3mpiYwHTm5ua7du3ipbILRq9WrVqx0Ss2NpaXEnIJOZ2QKf766y9HR0fYrU2bNgcOHOCl8sHhw4fbtm2L996xY8f79+/zUkLOIKcTssPChQs1NDSMjIy2bNnCi+SP+Pj42rVrq6mpBQYG0oXtcgg5nZAFXr9+7eDgoKSkFBAQ8PHjR14qr+Tl5c2fP19ZWdnOzk58v5YiJBNyOiH1XLhw4bffftPX109NTeVFRP4FP4b54AUvIuQAcjoh3Rw5ckRNTc3CwoLuhPUtSNKtrKxUVVX37dvHiwhZh5xOSDFM6DY2Nv/3f//Hi4h/k5ub6+DgAK1jX/EiQqYhpxPSyoMHD7S0tCCsvLw8XkR8j0+fPnXv3l1DQ+PWrVu8iJBdyOmEVAKPN23atH79+vTj+MLw/v37Jk2amJiYfPjwgRcRMgo5nZBK5s+fr6Ojc/fuXR5LHi9evOjcufPmzZt5/GNYy9mzZ/NYPGRmZmKPzZgxg8eEjEJOJ6SPN2/eaGtrh4WF8VjyOHnypEI+v3T6jRs3TE1N0VLcTgcRERGampoYQnhMyCLkdEL6WLRoUeXKlSX8e1Ema8nJ08HHjx+x3wIDA3lMyCLkdEL6aNu27ZgxY3ggqUjauRfGpEmTWrRowQNCFiGnE1LGkydPFBQUDh48yOMSI5Cv4DTI8OHDMQkQhKgVPl8hKAffihglKEeDkydPsm5Z/yhk3QpCQbesRLgrQRsgWtcfPXoUfWZmZvKYkDnI6YSUkZSUBCsxG5YcwYlvJLAAzmUlvXv3Fja7IN1GLUIU4jWrYs1YLfzLQoDXggWZowUt8Revf+R0dOvh4cGq2MaIUOs5OTnocOvWrTwmZA5yOiFlREZGKikp8UAUFFBzAcMKh8zFwqdT8BqKZCUsMWcuBgUGA/QgWAULf+R0vBAsVcD+IkFHR2fFihU8IGQOcjohZcBHenp6PBAFTKkCjRYwrHDIsmb8ZVWAiZvV4q+wtQt0W6AWocDUwqtgEsdahMEqsKL85USAoaHhggULeEDIHOR0QspISEiA5kT429EC8hU2bIHwW6ezWlj45cuX+AtK6HT2WngVouXr16+KioryfC9imYecTkgZp0+fhlhF+C1fAfkKG7ZAyJwuaAkEtSy/FpXT2Wtx8PjxY7yFo0eP8piQOcjphJQBLaqrq0dHR/O4xBSQbwGrfitcgBeslp17YWk12gifJCnQD14ILygcftsS2hWEIDExUVTnXrZv366iovL27VseEzIHOZ2QPnr06OHg4MCDEiN8TlwQCnLqAiFL1YX9W6ClwNRMzYA1QCgwPsYPVsVK2IIF+mENGIKqkuPs7Ozo6MgDQhYhpxPSB7vI+sKFCzwuAczRDKjz4MGDPMgP09PTBXoVyFp4EYHcGcI6RnItnH2zZJxVwekoZx0W2ADmbuHGIhR6RkaGkpLS3r17eUzIIuR0QiqxsbFp3bo1D4jCYWVl1apVKx7INI8fP05JSdm0aVNwcPCECRMGDRrk5ubm5OSE6V3Xrl27d+/u5eXl4+Mzc+bMFStW7Nmz5/r161++fOELSznkdEIqOXXqFHLYhQsX8pj4FZAX9hhMx2PZAjObhISEKVOm2NraVq5cOX+Go6Cmpla7du02bdrA47179x4wYMDgwYPhdwgdWu/QoUPjxo319PRYY0VFRcyxUIsddfnyZd6vFEJOJ6QVPz8/JSWl48eP85j4MWfOnMG++tFNcl69enXp0qWdO3cuXbr09evXvFQauHDhwuzZsy0sLJiXmzVr5u3tHRERkZyc/PDhQ97oV7x9+xb9bNmyxd/f397eXldXF10ZGhpiAIiPj//8+TNvJyWQ0wlp5evXr87OzhUqVGCXnRA/Ii0tTUdHx87OLjMzE/sK8goMDBw5ciSy1/r165cvX54JkSEVpyCys7NDQkJgcGwwMnEfHx8k6RiZeHWJwR4LCgqysbFB/5qamkOGDJGiqz/J6YQUwx62iSn2rl27eBEhxLVr1zp16gQxIUkvV67cP85WUFBWVlZXVy+gcoaVlRVfUlI5d+4c0mdsapUqVcaOHSvu4RyDB7J+S0tLrNHc3HzdunW8QoIhpxPSzadPn9zd3SEszMGRufNSIn8eg2RToPJfgqFRkp+ClJ6e7uHhge1s06ZNVFQULy0tzpw54+3tjbUbGxuvXbuWl0ok5HRC6oG8AgMDkYra2dm9fPmSl8o3r1+/xgwG+yQgIACzmfnz56uoqMDa+fb+Ifv27ePLSxI5OTnjx4/H5iFfTkxM5KVlwYMHD8aMGYMtsbCwOHz4MC+VMMjphIxw6tSpGjVqYEoeGhoqM9elFQO898jISOyHatWqYZ/w0v/+9+7du9bW1oqKivn2/iGxsbEwF19GAoiLi8O/FZR+bv4jMjIy3NzcsK/Gjh0rgUcaOZ2QBT5+/Lhz507MzVVVVfFha9SokcSmUWLl2LFjjRs3hriHDx/+5s0bXipEdHR0xYoV2V4qwLdn2MPDw1NTU8tQWyw9HzlypKh+dSVCsCcNDAxMTU1Pnz7NiyQDcjohxUDlSUlJffv21dbWLleunJWV1dKlSw8dOtS0aVO4oEuXLjdv3uRNZR28UxcXF7xrvPfz58/z0u/x6tWrYcOGwfvCp9pVVFQGDx6MWtgzOTk5MDCQV+RjaWk5ceLEbdu2/fXXX6wTcfPkyRM7Ozv8W2NiYniR5IGN7N69O/bPxo0beZEEQE4npA+oPDEx0cvLi6nc2toaKn/69Cmvzj//EB8f37x5cyUlpREjRpSaicqER48ejR49WllZGe8XBixkWn3q1Km6desKtI4Xa9as4XVCYKjYsGGDj49PixYtWMuaNWtiPrRw4UL0IKYvpW/cuGFiYoK3k5GRwYskmClTpmC3SM4t6cnphNSQm5vLVF6hQgU4qEOHDsuWLRNW+bccPXrU3t4evkPSt3nz5g8fPvAK6QfvBQbHXATvDu/xwIEDvKLQ5OXlse9OmayvXr3KK35ATk7O4cOH582b161bt6pVq2IRVVXV9u3b+/n5bd++PSsri7crGRhFateubWtr+91zR5JJeHg49kZoaCiPyxRyOiHpQOUJCQl9+vSBypF329jYLF++/Pnz57y6EEA3MBHSUvQwePDgEydO8Arp5OTJk8OGDdPS0qpTp87s2bORp/OKYnH37l1jY2MoiceF5vr161FRUZgGsd/+ALgY/6bFixefOXOGNyoif//9d5MmTfAvFuEzT0qHRYsWYQ9IwmWO5HRCQoHKd+zY4enpCXlB5R07dlyxYkWRVP4tf/75J2yoo6NTq1atgIAA6Ton8+DBgzlz5hgZGWFkGjJkiGhHptTUVP6qWLx9+/bgwYPYPEdHR3YHFTU1NWtr68mTJ+OfWPhRBzOARo0aSekFqdOnT8cbL/ObVZDTCckCKo+Pj/fw8BCofOXKlSVUeQE+fPiwZcsWe3t79N+gQQNvb+/169ffuXOHV0sS9+7d27hxI8YhmA5b26lTJ6k4g5SRkREZGYnNZl9WM7y8vCIiIs6ePcsbfQOGBDT7SQPJx93dvWHDhp8+feJxWUBOJyQCeGr79u29e/dmKre1tYXKxZ2vvXr1avfu3f7+/paWlqqqqvr6+j179lywYAG0UlZ3bsJ6z507h4k87FC1alUVFRULC4tJkyYlJSX9/fffvJFU8fr16/3792NW5ODgwOTOwG5PSEjIzs5mzS5cuIBCvHEWSilIPnAU+fr68rgsIKcTZYlA5ZqamlC5nZ3dqlWrymTqjS05ceLEvHnzoJ4KFSpA8fXr1+/cufOIESNCQkLi4uKgWtFaFSMKRIa3Hxoa6uPj06VLF2NjY6xXW1sb60XSevToUcxaeGtZ4cqVK2vWrGG/sxcGGb21tTVvJM1ggoK3c/HiRR6XOuR0ogyAQGHJXr16QeXKysqdOnVavXq15JxF/fr1a2Zm5qFDh5YtWzZu3DhYvk6dOuyyPx0dnebNm2MagUIXFxdk015eXoMGDRo+fPiYMWMmTpw4derUmTNnTps2zc/PDyUoZzfsRku0x1JYtkWLFugHvWEYq1WrFgyOlhEREQcOHLh//7783LUG//G9e/fOmDHjH6krKBTj0p1fsnnzZlOhh8QWYPa/H/wtKlq3bt2/f38elDrkdKL0eP/+/bZt22A3DQ0NdgUeUjZpOaWQl5d3/fr1pKSk4OBgf3//0aNHDxw40M3NDfl1u3btmjVrVrduXQMDAy0tLdgfYxXm4BgJIBRLS0tY29XVFZ9z5OOTJ09GYp6YmJiRkSF1V3eICYx5YkrSf+R0wdMBxeH0jRs3ouey+gaenE6IHah869at0J9A5WvXrpXSs8OEyHn79i0MWPpXAULlELo4nA709PTCwsJ4ULqQ0wlxAZXHxsYiP4XKVVRUkBaRyolviYuLg9PL5MybmM69AMzhOnbsyIPShZxOiJicnBymcnV1dai8S5cukZGR0vVENKI0GT9+vLm5OQ9EzbfnXk6ePIkhBKBKfE5fv349Dv4y+WqEnE6IBqg8JiamZ8+eTOUODg7r1q0jlRO/xNbWdujQoTwQKVA23C3sdAhdECYmJtrb24vJ6ZcuXcKqf3m7BXFATidKBFS+ZcuWHj16lC9fHirv2rVrVFQUqZwoPPXq1Zs7dy4PRI1wns6+FxU87g4q/+dsunic/ubNGzi9TJ4xQk4nigNUvnHjRmdn538msQoKUDkmm6Ryohjo6+tHRETwQNQIO104SWeI79wLKFeu3NatW3lQipDTiSLw7t07qJzdp5upPDIyUorun0dIIAYGBosXL+aBqBF2+rfn1sXqdHxA4uLieFCKkNOJXwOV4/MAlaupqamqqjo5OW3YsIFUTogEExOTmTNn8kDUlJXTX7x4AaeXycO2yOnyRVpaGn9VCKDyTZs2OTs7Q+WgW7duSNJJ5YQIefnypZWVVb9+/XgsaoQ9zq54QQmrAnB6586d4V8ei47Tp09jXbdv3+ZxKUJOlyMWLlyI4+yXd6KAteFuGJypHE6H2eF3Xk0QhSYnJ+fWrVvHjh3bsmVLaGior69v796927dvX6dOHeHHnzZq1IgvIGrYpS/se1H2paggZIoHBZJ3kbB06VJdXV0elC7kdLkARzM+S+wI/uOPP3jpv4HKN2zY4OTkpKqqSionCsPnz58zMzNPnToVHx8fERExderU/v3729nZmZiYVKxYkR1vQEdHp169epaWlj169IBVcQQuWbIkNjY2OTn5ypUreIE29+7d452KCIHBGQW0DqB78eXpPXv27N69Ow9KF3K67HPnzp0GDRooKyuzQ7lmzZq8Ih+ofP369Y6OjlA5UicXFxdMTknlBOPp06cXLlzYvXv36tWrAwIChg0bhkOlefPm1atXZzc1A8gAjIyMzMzMUDVo0KDJkyeHhYVhqrd///7z589nZWV9/PiRd/cDKlWqFBISwgPpB58p7JzIyEgely5y4fS8vLzs7OzLly8jL9i6dSumRTg6/f39x48fP3LkSByFffr0wbjatWtXW1tbZBOtWrVq3Lhx3bp1a9SoUaVKFW1tbfhOUVERysN8Sl9fH0ewsbFx06ZNzc3NMZHs1KlTt27d3Nzc+vbt6+3tPWrUqIkTJ06bNi0wMHDNmjWJiYmpqak3b94sk5/F79q1S0NDA9vPPn6MjIyM169fR0VF4S0zlSOniI6OxkyZL0bIBzgMrl27dujQIUzRcLiOGTPG1dW1bdu2tWvXxmHDDxcFhapVq+Jox3Hu5eWFT838+fPXrl27c+dOZOh3794teQYwbtw48Z1+KX3Cw8Ox996/f8/j0kUWnI4sgKUSyDdDQ0ORJgwePBiStbCwgJfZTU0ZGDwrV67csGFDKysre3t7Z2fnXr169evXb+jQoTia/fz8MCucO3cuOsFEEokJco1t27YlJSUdOHAA48G+ffsSEhIwVcSKVq5cuXjx4uDg4FmzZkHfEyZM8PHxGTJkCA56fCqcnJwwA4Xx8dmoUKECX72CApJlDAkYMDp06ODu7o5FZsyYgXXFxMQcPXr0wYMHIvwxMebFGLf4ioXANmC34AVTOd4jqVxW+fDhA5ybkpKCVGbBggU4wnF8InGBQNkT5hg4ROvVq4fshB2TyHiWL1++ffv248ePX79+vRTuxIJxBZuBcYXHUg6mwtjVPCh1pM/pjx8/hl5XrFiBsb1Lly7YfcigcUBgAmhoaNisWTNkE56enmPHjp0zZw6asUMTmemzZ8/K6s7Uubm5mIGmp6cfPHgQ6TAGAwwew4cPx+QAowvGGIw07F2oq6ubmpr27t0brt+yZQumrsW70OrFixc2NjZKSkr/fGS/oWLFiuicVC7t4Hh++PDh2bNnMReEhX///XdkFY6Ojpho/uc//xGcbVNRUcGM08zMDIkO5pFIQRYtWoQDAOn5pUuXMIX98uUL77HsGDFiBMYVHkgzs2fPxqf4yZMnPC51JNrpUOGVK1cgZeTOyKZxUGpqauIYRbqN/Ldr166+vr7Il5HhQvR8GaklLy/vxo0b+HAi98c8A/NflknB9fhAIusfPXo0Mnp8DjE88GV+wLlz5zAbwCCX/4n+PpmZmbw1IcE8f/4c2sUEMTIyEp8CHANubm7t2rXDTEtLS4v/LxUUkBNg8oeDpG/fvsgQQ0JCMJXcs2dPWloa/tHI1nl3EgwkiFRj4sSJPJZOkITh3xEeHs7jskDinI4EMykpCcdlmzZtWKKhq6vLnhsyf/78+Pj4q1evys+TBDDtTU1NXbdu3eTJk11cXBo0aMBSb3yGEYaGhp4+fbrAA20xyGG/saz/R6ABdiZfgCg73r17h4Ec807M3iCCSZMmIXfBRLNJkyZVqlTh/y0FBaQyderUsbS0dHV1HTVqFCagq1evTkhIwLFx+/ZtmfnFAMYhvNlt27bxWAoxNzfv0qULD8oIiXD6vXv3NmzYMHTo0IYNG+KfCh9BXphFwmU3b97kjYh8MHdJSUkJCgrCPJpdLoaJXocOHaZPn7579+4WLVr844BCgLSO90iIDSQfDx48+PPPP5GLLFu2DP8jHOTOzs745P/222+CL64xThsaGuJ/h6knpmjTpk1bsmTJ1q1bMQHNyMhAqs67kwPGjh2roaFx9uxZHksVmCQZGBjgP87jMqJsnP7ly5f09HQcuL169apatSoOazU1Ncwop0yZsnPnTnpsQiH5+vXr9evX16xZM3DgwJo1azJBFB46/VJysrOzL1y4sHfvXuQfmPpASTikrays6tevr62tzXe0gkKlSpVMTEw6duzYp0+fCRMmhISEbNy48cCBA/gUPHr0iJ5gJ0z37t0x4GEw47GUMHr0aPyjjxw5wuOyo1Sd/vTpU+TjHh4eLMHE7NLFxQXHN6aQdFiXnMePH2PeOm7cODMzMxUVFezhevXqITHcvHnzlXxgkLS0tFOnTiHTRw747NkzviTxA169eoVRE/sqJiZm4cKFyDkGDBjQuXNnU1NTfX39f2ydD6ZKtWrVsrCw6NGjx8iRI2fNmrVq1aqkpKQzZ87cv3+fvosuEp8/f8YehtalKFtnv2NKSEjgcZlSGk7HZCQgIACiUVRUxHzT3t4+IiJC5D/GJYTJzc09duzY5MmTjY2NcbRVqFChZ8+eGFCLdxWNrPLx40dMVk6fPp2YmLhy5UocpSNGjECe2KZNG8x7BD9ex3GLOXWzZs26dOmCKZG/v/+iRYtiY2Oxh3EY07RS5GAej9FRU1Nz+/btvEhSefPmDQ4YHCq7du3iRWWNGJ3+/v17TDBtbGzwkcA8tG/fvsgiKWcpfW7duhUWFtauXTv8I3R0dJBTIH/kdbLOy5cvr169evjwYUxWsBMmTpz43Qu0sVsw+HXo0AGTyPHjxwcFBa1fv37//v0XL1588uRJWV0CK+eMGTMG/5rp06fzWPI4cuQIDpsGDRpI1JRCLE6/e/cuxIHcECOtp6cnkiA6tSIJPHr0aMGCBebm5viomJiYLF++vCRpO6YCq1ev7tSpE4/Lgm8TbRx4Li4uSLRr1arFrnxlINFu2bKlo6PjkCFD/vjjj6VLl8bHx6empuJYpbmLxIIDTElJydraWgKzkGnTpuG4gt8k7bojETv90KFDTk5OyAehjOjoaKm4MFYOuXfvnp+fn5aWVsWKFadMmQLX84rCgeR3zpw5urq6TJe8VDx8m2j369fP3t6+WbNm1atXF/yoSkVFBRLHXKRXr17jxo0LDAyMiooSJNq8L0IKycjIcHBwwL94woQJr1694qVlSkxMDHJzbW3tVatW8SJJQmQfSHx4WrdujV1vY2Ozd+9eXkpIMMgvgoKCkMBCiJMmTSrMaTFktaNHj1bNv3Fjvkv/oSSPrBNOtPEJmT17Nvp3d3dHaoaPTaVKlfg6FBTwEWrYsKGdnd3AgQPZ1X5xcXEpKSm3b9+mE3oyT2RkZI0aNXAMzJo1qwzz4qSkJByZOBqHDRuWnZ3NSyUMETj9xYsXmPAiN4fT2Q0tCSkiNzc3PDwcSXe1atU2bdrES78Bk1+oFv9lwTeHAn7+dTdLtJOTk5HdLF68GDr29vbu1q0bjpaaNWsWuFFUixYtUDVixIi5c+fiY4zk4MKFCxL74SFKk8+fP2P6VblyZXV1dUzFLl26xCvET15eHhIOMzMzHKX4FEj4BTkldfr69euhg3r16knIdTxE8UDuM3HiRCTg7du3v3XrFi/NvwQeuUm7du1wNP/oZgPIl8+dOwf/RkVFBQcHo5++ffva29ubmppinBDckVVJScnIyKht27b4VPj6+oaFhcXGxh4/fvzmzZtv377l6yOInwK9IjNo3LgxjigrK6uIiIhf3iqjJOCoHjJkiJaWFg7joUOHnj9/nldIMMV3+r179/D5xAd18uTJyPV4KSHNIONG+gyzz5kzJycnZ/Xq1bVq1cKHh13t/l2QufNXCgo49I2NjTt27Ni/f/+pU6cuW7YsMTExLS3t0aNHknCXKEKWOHjw4ODBg9lNTy0sLKZPn3748GGRfIF37dq1lStX9urVi31jhCxn6dKlUnTFajGdnpGRgZky5s5SMXARhQfynTlzpiC5/iUYAKBvCfnyipBDdu3aNWrUKPY7DNC8efOBAweGhIQgn7h06dLLn94omN2LODk5ec2aNRMmTMDksnLlyugE2YmzszNULvKnL5UCxXE6JtoYwaytrUtt7Nq8ebOYHjFVeLB2bAO2hMciBQmyqampmDovKu/fvw8NDVVWVkZ6DrmDn9ziEVVwOl+SIMqOzMzMbdu2TZkypUuXLr/99hs/QPNnmfr6+nXq1GnUqBE+ZU2aNMEAUKNGDeEHG+C1mZkZEv+IiAhp//VGkZ3+5MkTPT09V1fXz58/8yJxInh+YNk6XfA4WnlwOgObVLFiRQ8Pj507d44fPx4fA0VFRSUlJXV1dbYrGCgZNGgQX4YgJAakJteuXTt8+PCWLVuWLVsWFBQUEBAwffr0GTNmzJ07d+HChevWrcOxffbsWRm72rVoTsfE3NLSsl27dr98wKBoEd+jYAuPBGpX3Jw6dap8+fLR0dEsfP78eVxc3MiRIwUn2dlVKy1atGANCIIoc4rmdHy8kZeV/v38YFLZPvciscyaNQvZ+rdD+KNHjzZt2oS5Kpxet25dXkoQRFlTNKc3a9bMy8uLB2KG5cVQBpL0Ak4XnJABeCH4bTdaIszKykJjVGFxdMKqgOD8CRBcR8/WglBQi05YFQMhClmbAk4XLALwmhUWskMg/I6+nQQIFgd4zQoFbxx/09PTExMTWbn4QG6urq6+cuVKHn+P0h/jCYL4EUVw+tOnT2GT0rn9mMCMeI2/vXv3FhgQfz08PJisWTMI7uHDh8zj9vb2qEUbgBLBUtClwK3MqugWhXgB0D+rZSUCh6KQjRkAr4W1W4wOmZFZD2zzWOeoZUv9vHNWztp8OwaIDxcXl27duvGAIAjJpghOP3bsGOQCe/JYbAi7jwGvfdfOAK9hNziOLSVoBpgr0R4lgmEAMCGyTgRthKtYiCrh3oSritch/jKJsyqEgv4L2Tn+CvdcCnk6mDlzpmw8/Jcg5IEiOH3Dhg0qKio8ECfMYiwzZQjrD16DNAvAGqNKWJpoj6VQyDrkTf8Ha1lgXSxk3vxub6yq2B0CVl4A4WY/6RwNBK/ZgqUAVqqsrMwDgiAkmyI4PTk5GUIphYfjsFT3u06Hy2A05r5v+a6FUYiuBENCAX6kYLaib3tjqxZJh8IImuH1TzoHeDv/OL4UL+6cO3dunTp1eEAQhGRTBKc/evQIKjl27BiPxQakhhUJtAggO6awn5vxJ04v0KGAYju9qB3iNbYEr1HCqoQRbvaTzgUwswtvnvjw9PR0cnLiAUEQkk0RnA7MzMzgER6IDSY4aIvH+U4X2BCvC+gM+mMGxCLC2SvrB1VMx8KixLKrVq3CX0EbVi7s1gIKFowQgtdF7fAnWy7c7Cedr169WvDuUCv8ZsXEmzdvtLW1sV4eEwQh2RTN6fHx8UpKSqVwDwSWhzLHMd8hZJoTKE+AQG3CS8GAsCdTMGA+FYY1Q4eC14KQLcXWW6BzwKRcjA5/suXCzcCPOkcDwZCAEuHhQUxMmTKlWrVqpfwTM4Igik3RnP7161djY+NWrVqJWyVA2KHIUqFXSJZVMV+zWoEWAVMeGrMqgSIZzJsMpkhhdaJxgRANhIeTxMRErEu4z2J0+N0t/7YZ+LZzgG1IT09nmyT8xsXE8ePHVVRUwsPDeUwQhMRTNKeDixcvVqhQwcnJSQLvngohlkLqKidcv35dW1vbzs7u06dPvIggCImnyE4Hqamp5cuXR54oaQ9XJaeLilOnTlWpUqVNmzb0RFmCkC6K43Rw7tw5AwODOnXq3LlzhxeVNey0RimckZB5li5dqqysjKkYPeeTIKSOYjodPHv2rGXLlpqamsHBwWU+PYfHYXN29ln4zDtRJO7du+fs7KyoqCg4rU8QhHRRfKeDvLy8oKCg8uXLGxsbHz9+nJcSUsiHDx9mzZqlpqZmYmIi7c8EIAh5pkROZ2RmZrq4uCBB7t69++XLl3kpISVgYI6MjKxVq5aWllZYWFjpPOqEIAgxIQKnM44dO2ZrawuzOzg4nDp1ipcSEgxy86VLl/7nP/+Bzf38/Erhrg8EQYgbkTmdcfr0aUdHR5jdyspq7dq1r1+/5hWEJHH16lV/f399fX1dXd3p06fTE6IJQmYQsdMZN27cmDhxYqVKldTU1FxdXRMSEuiHiJJAVlZWSEgI+8mSmZnZqlWr3r17x+sIgpAJxOJ0BjweGxtra2urqKiora3dq1evLVu2SNol7fLAtWvXAgMD27Rpg3+Ejo6Oj49PRkYGryMIQrYQo9MF3L17NzQ01MrKSklJSUVFxc7OLiIigi43FCu5ubnHjh2bNGkSex60np6el5dXXFwcynkLgiBkkdJwuoC///4bqXqfPn2QLUI0VatWdXV1Xbhw4blz5+hyi5Lz4sWLxMREPz+/tm3bqqqqYg83aNAAWTlUjhEU2fqVK1fS09PT0tJOnTqVkpLy+PFjviRBELJCqTpdwJcvXyCXJUuWuLu7w+ywj5aWVqdOnWbPnp2cnEy/Ry88WVlZMTExo0aNatSoEXZjkTh//jzvhSAIWaFsnF6AO3fuREVFDR48uF69enCNiopK69atkW8mJSUhteeNiHy+fv2akZGxcuXKvn371qxZE7urfPny7du3nzZt2u7du9lFR4WE90gQhAwhcR/sp0+fxsfHjx8/vmXLlkpKSlCPoaGhjY3N8OHDw8PDd+3adevWLfm5U+CbN2/S0tKio6Nnzpzp6emJfaKhoYF9oqur27Vr18DAwJSUlALXFO3duxeWZ7vuR2DUnDRpEl+AIAgZQqKTtQ8fPly6dGnr1q2zZs2C0Zo3b86MpqysjIweOamvry8y1uTk5IcPH/JlpJbc3Fwk4AkJCcHBwUOGDEHqra+vzxRcrVo1jGojRoxYtGjR/v37Hzx4gGydL/Y97t27h/2jpqbGFv8up0+f5q0JgpAhpGwCDpdlZmYeOHBg8eLFI0eOhOngOyYpVVXV6tWrm5qa2tnZeXh4jBkzZvbs2StWrNi+ffvx48ehy2fPnv1cheIDvs7KykpPTz948CCSbqj5999/x8yjZ8+ecHeDBg309PQUFRXxLpBBN2zYsEePHv7+/uvXr4d5i3dzRKyxT58+5cqVYzunADo6OqmpqbwpQRAyhCycVIW//vrrr7S0tD179kRFRSHPnThxYr9+/ezt7Zs1awbRC05EwHGVK1eGNGFS1Do7O/fq1Qsthw4dOnr0aD8/vz/++GPOnDmhoaERERGrV6/euHHjtm3bkpKSMIpgNrBv3z7k0TExMbAt5gcYV7AuzCGmTZs2YcIEHx8f5NdeXl6urq5OTk4YWszNzWvXrl2hQgW2doDXderUsbCwcHFxwUphdnSCDtH51atXRT7qREZGYk7D1/0/MGxgt+CFoaEhRj66+RpByBLy8kXZ33//fePGjRMnTsTFxS1btiwgIACJsK+vL5L9QYMGIaVFyty1a1dbW1tLS8tWrVo1bty4bt26NWrUqFKlira2NiYByKPLly+vq6urr69vZGRkbGzctGlTWBvDQ6dOnbp16+bm5ta3b19ofdSoURhUIPqgoKB169bt3r377NmzDx48KJMf016+fBlTGXZpo4CTJ09i4oJ5DN4CQgMDA+yHI0eO0BWlBCHtyIvT5Zm3b99i1BFMVvT09IRnA3fu3Jk/f37Lli1RhUmMt7f3/v376Xl1BCGlkNPlhZCQEHZ6HdMIXvRvMjMzQ0ND2S0EKlasOGDAgF27dtGNeghCuiCnyxGpqalw+tGjR3n8Ax49erRo0aL27dtjDNDW1u7Tp8+OHTvoh2AEIRWQ0+WL69evF/5r2KdPny5btszGxkZJSUlTU9Pd3X3r1q30kFKCkGTI6cSvefny5erVq+3t7VVUVNTV1bt3775582a6Ty9BSCDkdKIIvH79OjIysmvXrv982aqg4OjoiJCefEIQkgM5nSgOb968iY6OdnZ2ZnLv0qXLhg0bSO4EUeaQ04kSkZOTExMT07NnT3V1dRUVFcgdmTvdeY0gygpyOiEa3r9/Hxsb6+bmpqGhoaysbG9vv2bNGpI7QZQy5HRCxEDu27Ztc3d3Z3Lv1KnT6tWrX758yasJghAn5HRCXHz48CEuLq53796amppKSkp2dnYrV64kuROEWCGnE2IHco+Pj/fw8NDS0oLcO3bsuGLFiufPn/NqgiBEBzmdKD1yc3N37Njh6elZoUIFyN3GxmbZsmVSKvdr167hvYSGho4ePZrdM7lx48Y1a9asVq1a1apVDQwMjIyMGjVq1K5dux49eowaNSokJAQDW0ZGBl+eIMQDOZ0oAyD3xMRELy8vbW3tcuXKWVtbL1269OnTp7xaInnz5g17hDc0Xb58eXYRJ8RtZWXF7tc/Y8YMiHvx4sV4L0uWLMHrmTNnjh07FmMY3iB70CBQVVVt27atr68vhgT6DpkQOeR0oiz5+PFjUlJS3759dXR0IHf4MSIiIjs7m1dLAJmZmYsWLbK1tWVGbtmyJZLudevWnT9/vqj3wMGbTU9PX79+PQYAMzMz1mGHDh3Cw8Pv3bvHGxFEySCnExJBXl7erl27+vfvD7krKioiF0bCW7Zyj4mJcXBwgHYrVao0YMCA2NhY0X7B++rVq7i4uMGDB1epUgVrsbe337RpE68jiOJCTickC8h99+7dcKiuri7kbmlpiTT50aNHvFr85ObmhoSEGBkZwbNubm47duzgFeJk586dHh4eWKOhoeH8+fPpRmlEsSGnExLKp0+f9u7dO2jQoIoVK0LuFhYWCxYsELfcw8LC2JOtpk6dmpmZyUtLC7y76dOnY1qA8SwoKIiXEkRRIKcTkg7kvm/fvsGDB0N2kHubNm3Cw8OzsrJ4tYhITExs3LixqqrqjBkzyvaWk5gozJkzR1NTs379+nFxcbyUIAoHOZ2QGj5//nzgwAFvb289PT0FBQVzc/PQ0NCSy/3Dhw/Dhg1Dh5gTiHyoKDZPnjxhWzVw4MA3b97wUoL4FeR0QvqA3A8ePDh06NDKlSvDemZmZiEhIcU7VZKammpiYmJkZFQ6582Lyu7du+vm88unUxEEg5xOSDGQ+6FDh4YPH84uHWnZsmVQUFDh5b5p0yYs5erqKsnXiefk5Hh6emI7165dy4sI4seQ0wlZAHI/cuTIiBEjqlatCv21aNEiMDDw/v37vPp7LFmyBC2nTJnCY8lmxowZ2NrQ0FAeE8QPIKcTMsWXL1+Sk5N9fHz09fUhwebNm8+bN+/OnTu8+n9ERESgNjg4mMfSwKJFi7DNYWFhPCaI70FOJ2QTyP3YsWOjRo0yMDCACk1NTefOncvkHhsbixIk8qylFLFgwQJs+YYNG3hMEN9ATidkH8h97NixLHOvV6+eiorK+PHjeZ204e/vj3dx9uxZHhPEvyGnE3JESkqKoaGhpaUlj6UTJycnMzMzHhDEvyGnE3JESEgIktxr167xWDq5d++eurr6rFmzeEwQQpDTCXnhxYsXmpqac+bM4bE0ExoaWq5cuYcPH/KYIP4HOZ2QF2bMmGFgYPDlyxceiwgMFZ07d968eTOPS4tatWpNmjSJBwTxP8jphLxQvXr1gIAAHoiIkydPKuRTSKejPeBByQgODtbV1f369SuPCSIfcjohF+zevRvmvXv3Lo9Fx40bN0xNTQvp9NmzZ4vK6Y8fP8Y7opt8EQUgpxNywdixY8V0rUjhz73A5rCwqJwOrK2tvb29eUAQ+ZDTCbkAQvf19eWBKEDGDUEjQ4ejCzidZe6oBWjGCll7ASIx+++//96oUSMeEEQ+5HRCLtDQ0Fi3bh0PSgwEPXz48P/LB6+Fz71A1gihdbxmcmctBaEI8/SYmBgMDyL/1peQasjphOzz8uVLuO/gwYM8LhksMX/x4gULhc+nw90wuHDOjtdYNSsRudPRFTqnKxoJYcjphOyTlZUF9/355588LhmCJJ2FwufTmWSFrc08zs7AiNzpFy9exOpu3rzJY4IgpxPyQHZ2Ntx3/PhxHpcAlokX3umslrUXudPT0tKwOnFczENIL+R0Qvb59OkT3CeSy/4K43T2msFqxZSn79mzB6ujJ9sRwpDTCbmgdu3a8+bN40HJYF+KQtAsFLY2ew3wgtUKe1zkTl+4cKGBgQEPCCIfcjohF7i7u7u4uPCgZDA1C8QNmyNZBix5Z6k6UzyrFST1bEFk8VhQJF/Yenp6Ojo68oAg8iGnE3LB8uXLtbS0eFBimJ2ZyhMTE+F3gcQB0zpDuBywAUA4kS8JVapUCQ8P5wFB5ENOJ+SChw8fQqYxMTE8ln4wluAd3b59m8cEkQ85nZAX3NzcbG1teSD9ODk50YkX4lvI6YS8cPToUSS2e/bs4bE0k5ycjPeyd+9eHhPE/yCnE3KEu7u7ubk5D6QZa2vrbt268YAghCCnE3LEzZs3y5UrJ/K7qJcyQUFBSNIvXrzIY4IQgpxOyBfLli2DEHfu3MljaePgwYPYfrrchfgR5HRC7hg2bJiuru6FCxd4LD1kZGTo6+v379+fxwTxDeR0Qh7p1q2bkZHR1atXeSwN3L59u379+p06deIxQXwPcjohj3z69Klz586GhoaiulmjuDl37lzt2rU7dOiQk5PDiwjie5DTCfnF3d1dRUUlOjqax5JKXFycpqams7Nzbm4uLyKIH0BOJ+QaPz8/BQWFCRMm8Fjy8Pf3xxaOHTuWxwTxU8jphLyzefNmXV3dZs2aHThwgBdJBsnJyebm5qJ96h4h85DTCeKfByF5enoiHR4wYMCtW7d4adlx//59b29vbI+rqys98oIoEuR0guAkJCQ0b94cJvXx8bnxv9ujlzJ37twZN24ctqFx48bbtm3jpQRRaMjpBPEv1q5dC5/Cqu7u7qV5c5j9+/d7eHhgvQ0aNFi5ciUvJYgiQk4niO8QFxfXuXNnGLZmzZoTJ048ceIErxA1qampU6ZMqVu3LtZla2srS3cDJsoEcjpB/JDr168HBAQ0adIEwtXX1/f09FyxYkXJb7Ry+fLlVatW9e3bt3r16ujZxMRk+vTpV65c4dUEUQLI6QTxa65evbpgwQInJydtbW1YWFNTs02bNoMGDZo3b97mzZuPHj2akZHx+PHjd+/e5eXlffnyBX/xOjs7+9q1a8eOHYuOjp4/f/7gwYPbtm2rpaWFHvDXwcEhNDT00qVLfB0EIQrI6QRRNJCnr1u3ztfXt0uXLnXr1lVWVoajf46SklLt2rXt7e3HjRu3du1aabzVDCEtkNMJoqQ8efLkypUrKSkp+/fvT0pK2rFjR2Ji4r59+1CCcmTrvB1BiB9yOkEQhOxATicIgpAdyOkEQRCyAzmdIAhCdiCnEwRByA7kdIIgCNmBnE4QBCE7kNMJgiBkhf/+9/8BL8vond0CXJ0AAAAASUVORK5CYII="/>`
)}

function _module(id){return(
import(`https://api.observablehq.com/${id}.js`)
)}

function* _id()
{
  yield document.referrer.replace('https://observablehq.com/','');
  /*
  for(var i=0;i<Infinity;i++){
    yield Promises.delay( 100,  document.referrer.replace('https://beta.observablehq.com/',''))
  }
  */
}


function _dependencies(dot,id,module)
{
 return  dot`digraph "${id||"@bumbeishvili/utils"}" {
rankdir = RL;
${module.default.modules[0].variables
  .filter(v => !v.from) // Don’t graph dependencies of imports.
  .filter(v => v.name)
  .map((v, i) => {
    const inputs = v.inputs || [];
    const name = v.name || `#${i}`;
    return inputs.map(input => `"${input}" -> "${name}"`).join("\n")
  })
  .join("\n")}
}`
}


function _10(md){return(
md`# Continents Selector`
)}

function _continentSelector(createContinentSelector){return(
createContinentSelector
)}

function _13(md){return(
md`# Group By`
)}

function _14(group){return(
group([{name:'David',age:20,point:20},
       {name:'George',age:20,point:50},
       {name:'George',age:21,point:40},
       {name:'David',age:20,point:30}]
     )
  .by(d=>d.name,d=>d.age)
  .run()
)}

function _group(groupF){return(
groupF
)}

function _16(md){return(
md`# Bar Range Selector`
)}

function _rangeSlider(barRangeSlider){return(
barRangeSlider
)}

function _19(md){return(
md`# Comments`
)}

function _comments(disqussCodePart){return(
disqussCodePart
)}

function _22(md){return(
md`# Tablefy`
)}

function _tablefy(html){return(
function tablefy(data){
  return html`<table> 
   ${
   typeof data[0]=='object' ? 
    `<tr>
         ${
             Object.keys(data[0])
               .map(k=>{
                   return `<th>${k}</th>`
                })
                .join('')
          }
    </tr>`:''
  }
    ${data.map(d=>{
       return `<tr>
       ${
        Object.keys(data[0])
        .map(k=>{
           return `<td>${d[k]!=undefined?d[k]:''}</td>`
        })
        .join('')
        }
   </tr>`   
  })}
  </table>`
  
}
)}

function _24(md){return(
md`# Inputs Grid`
)}

function _inputsGrid(inputsGroup){return(
inputsGroup
)}

function _27(md){return(
md`## Peristent select input`
)}

function _persistentSelect(persistentSelectImpl){return(
persistentSelectImpl
)}

function _30(md){return(
md`# GLSL Tag`
)}

function _glsl(html,md){return(
function glslLoc(options){
  let opt = options||{};

  const interpolate = (strings, ...args) => {
    let s = '';
    for (let i = 0; i < strings.length; i++) {
      s += strings[i];
      if (i < args.length && args[i])
        s += String(args[i]);
    }
    return s;
  };
    
  const ID = 'glsl-styles';
  
  const style = html`<style id="${ID}">
details.glsl summary { 
  list-style-type: none; /* hide the triangle in firefox */
  outline: none;
  cursor: pointer;
  user-select: none;
}

details.glsl summary::-webkit-details-marker {
  display: none;
}

details.glsl summary:before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid rgb(27,30,35);
  border-right: 0;
  margin-right: 1px;
}

details[open].glsl summary:before {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid rgb(27,30,35);
  border-bottom: 0;
  margin-left: -2px;
}

details[open].glsl summary code.glsl span,
details[open].glsl summary code.glsl,
details[open].glsl summary {
  color: grey;
}
<style>`;
  
  const result = (...args) => {
    let string = interpolate(...args);

    
    if (!document.getElementById(ID))
      document.head.appendChild(style);

    const sig = string.match(/^\n*(.*)$/m)[1];
    const summary = md`~~~glsl\n${sig}~~~`;
    summary.style.display = 'inline-block';
    summary.style.margin = '0';
    summary.style.verticalAlign = 'middle';

    const el = html`<details ${opt.open?'open':''} class='glsl'>
      <summary> ${opt.title||summary} &hellip;</summary>
      ${md`~~~glsl\n${string}~~~`}
    </details>`;
    el.value = string;
    return el;
  };
  if(Array.isArray(options)){
    return result(options);
  }
  return result
}
)}

function _32(md){return(
md`# Style Tag`
)}

function _34(collapsedCSS){return(
collapsedCSS('Styles')`
blockquote {
  border-left: 1px solid currentColor;
  margin-left: 0;
  padding-left: 0.5em;
}
`
)}

function _css(collapsedCSS){return(
collapsedCSS
)}

function _style(collapsedCSS){return(
collapsedCSS
)}

function _37(md){return(
md`# Wrangle`
)}

function _wrangle(wrangleF){return(
wrangleF
)}

function _40(md){return(
md`# Load`
)}

function _42(md){return(
md`# Empty Hierarchy`
)}

function _44(md){return(
md`# Location Input`
)}

function _45(md){return(
md`# Lib`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["html"], _6);
  main.variable(observer("module")).define("module", ["id"], _module);
  main.variable(observer("id")).define("id", _id);
  main.variable(observer("dependencies")).define("dependencies", ["dot","id","module"], _dependencies);
  main.variable(observer()).define(["md"], _10);
  const child1 = runtime.module(define1);
  main.import("createContinentSelector", child1);
  main.variable(observer("continentSelector")).define("continentSelector", ["createContinentSelector"], _continentSelector);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["group"], _14);
  main.variable(observer("group")).define("group", ["groupF"], _group);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("rangeSlider")).define("rangeSlider", ["barRangeSlider"], _rangeSlider);
  const child2 = runtime.module(define2);
  main.import("barRangeSlider", child2);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("comments")).define("comments", ["disqussCodePart"], _comments);
  const child3 = runtime.module(define3);
  main.import("disqussCodePart", child3);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("tablefy")).define("tablefy", ["html"], _tablefy);
  main.variable(observer()).define(["md"], _24);
  const child4 = runtime.module(define4);
  main.import("inputsGroup", child4);
  main.variable(observer("inputsGrid")).define("inputsGrid", ["inputsGroup"], _inputsGrid);
  main.variable(observer()).define(["md"], _27);
  const child5 = runtime.module(define5);
  main.import("persistentSelectImpl", child5);
  main.variable(observer("persistentSelect")).define("persistentSelect", ["persistentSelectImpl"], _persistentSelect);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("glsl")).define("glsl", ["html","md"], _glsl);
  main.variable(observer()).define(["md"], _32);
  const child6 = runtime.module(define6);
  main.import("collapsedCSS", child6);
  main.variable(observer()).define(["collapsedCSS"], _34);
  main.variable(observer("css")).define("css", ["collapsedCSS"], _css);
  main.variable(observer("style")).define("style", ["collapsedCSS"], _style);
  main.variable(observer()).define(["md"], _37);
  const child7 = runtime.module(define7);
  main.import("wrangleF", child7);
  main.variable(observer("wrangle")).define("wrangle", ["wrangleF"], _wrangle);
  main.variable(observer()).define(["md"], _40);
  const child8 = runtime.module(define8);
  main.import("load", child8);
  main.variable(observer()).define(["md"], _42);
  const child9 = runtime.module(define9);
  main.import("transformFlatHierarchy", child9);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  const child10 = runtime.module(define10);
  main.import("dot", child10);
  const child11 = runtime.module(define11);
  main.import("groupF", child11);
  return main;
}
