﻿import { jsPDF } from "jspdf"
var font = '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AAMANgCAAAMAAQQJAAQAJAC2AAMAAQQJAAUAaADaAAMAAQQJAAYAIAFCAAMAAQQJAAcARAFiAAMAAQQJAAgAKgGmAAMAAQQJAAkAKAHQAAMAAQQJAAoAQgH4AAMAAQQJAAsAPgI6AAMAAQQJAAwAPAJ4AAMAAQQJAA0ClgK0AAMAAQQJAA4ANAVKAEMAbwBwAHkAcgBpAGcAaAB0ACAAMgAwADEANwAgAEcAbwBvAGcAbABlACAASQBuAGMALgAgAEEAbABsACAAUgBpAGcAaAB0AHMAIABSAGUAcwBlAHIAdgBlAGQALgBOAG8AdABvACAAUwBhAG4AcwAgAEwAYQBvAEIAbwBsAGQAMgAuADAAMAAwADsARwBPAE8ARwA7AE4AbwB0AG8AUwBhAG4AcwBMAGEAbwAtAEIAbwBsAGQATgBvAHQAbwAgAFMAYQBuAHMAIABMAGEAbwAgAEIAbwBsAGQAVgBlAHIAcwBpAG8AbgAgADIALgAwADAAMAA7AEcATwBPAEcAOwBuAG8AdABvAC0AcwBvAHUAcgBjAGUAOgAyADAAMQA3ADAAOQAxADUAOgA5ADAAZQBmADkAOQAzADMAOAA3AGMAMABOAG8AdABvAFMAYQBuAHMATABhAG8ALQBCAG8AbABkAE4AbwB0AG8AIABpAHMAIABhACAAdAByAGEAZABlAG0AYQByAGsAIABvAGYAIABHAG8AbwBnAGwAZQAgAEkAbgBjAC4ATQBvAG4AbwB0AHkAcABlACAASQBtAGEAZwBpAG4AZwAgAEkAbgBjAC4ATQBvAG4AbwB0AHkAcABlACAARABlAHMAaQBnAG4AIABUAGUAYQBtAEQAZQBzAGkAZwBuAGUAZAAgAGIAeQAgAE0AbwBuAG8AdAB5AHAAZQAgAGQAZQBzAGkAZwBuACAAdABlAGEAbQAuAGgAdAB0AHAAOgAvAC8AdwB3AHcALgBnAG8AbwBnAGwAZQAuAGMAbwBtAC8AZwBlAHQALwBuAG8AdABvAC8AaAB0AHQAcAA6AC8ALwB3AHcAdwAuAG0AbwBuAG8AdAB5AHAAZQAuAGMAbwBtAC8AcwB0AHUAZABpAG8AVABoAGkAcwAgAEYAbwBuAHQAIABTAG8AZgB0AHcAYQByAGUAIABpAHMAIABsAGkAYwBlAG4AcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAFMASQBMACAATwBwAGUAbgAgAEYAbwBuAHQAIABMAGkAYwBlAG4AcwBlACwAIABWAGUAcgBzAGkAbwBuACAAMQAuADEALgAgAFQAaABpAHMAIABGAG8AbgB0ACAAUwBvAGYAdAB3AGEAcgBlACAAaQBzACAAZABpAHMAdAByAGkAYgB1AHQAZQBkACAAbwBuACAAYQBuACAAIgBBAFMAIABJAFMAIgAgAEIAQQBTAEkAUwAsACAAVwBJAFQASABPAFUAVAAgAFcAQQBSAFIAQQBOAFQASQBFAFMAIABPAFIAIABDAE8ATgBEAEkAVABJAE8ATgBTACAATwBGACAAQQBOAFkAIABLAEkATgBEACwAIABlAGkAdABoAGUAcgAgAGUAeABwAHIAZQBzAHMAIABvAHIAIABpAG0AcABsAGkAZQBkAC4AIABTAGUAZQAgAHQAaABlACAAUwBJAEwAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUAIABmAG8AcgAgAHQAaABlACAAcwBwAGUAYwBpAGYAaQBjACAAbABhAG4AZwB1AGEAZwBlACwAIABwAGUAcgBtAGkAcwBzAGkAbwBuAHMAIABhAG4AZAAgAGwAaQBtAGkAdABhAHQAaQBvAG4AcwAgAGcAbwB2AGUAcgBuAGkAbgBnACAAeQBvAHUAcgAgAHUAcwBlACAAbwBmACAAdABoAGkAcwAgAEYAbwBuAHQAIABTAG8AZgB0AHcAYQByAGUALgBoAHQAdABwADoALwAvAHMAYwByAGkAcAB0AHMALgBzAGkAbAAuAG8AcgBnAC8ATwBGAEwAAgAAAAAAAP+cADIAAAAAAAAAAAAAAAAAAAAAAAAAAAB0AAABAgEDAAMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBEwEUARUBFgEXARgBGQEaARsBHAEdAR4BHwEgASEBIgEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyATMBNAE1ATYBNwE4ATkBOgE7ATwBPQE+AT8BQAFBAUIBQwFEAUUBRgFHAUgBSQFKAUsBTAFNAU4BTwFQAVEBUgFTAVQBVQFWAVcBWAFZAVoBWwFcAV0BXgFfAWABYQFiAWMBZAFlAWYBZwFoAWkBagFrAWwBbQFuAW8BcAFxAXIBcwROVUxMAkNSCWtvS2FpLWxhbwtraG9LaGFpLWxhbwxraG9LaHVheS1sYW8KbmdvTmd1LWxhbwljb0Nvay1sYW8Kc29TYW5nLWxhbwxueW9OeXVuZy1sYW8JZG9EZWstbGFvCHRvVGEtbGFvDHRob1Rob25nLWxhbwx0aG9UaHVuZy1sYW8Jbm9Ob2stbGFvCWJvQmFlLWxhbwhwb1BhLWxhbw1waG9QaHVlbmctbGFvCWZvRm9uLWxhbwpwaG9QaHUtbGFvCWZvRmFpLWxhbwhtb01hLWxhbwh5b1lhLWxhbwlyb1JvdC1sYW8KbG9MaW5nLWxhbwh3b1dpLWxhbwpzb1NldWEtbGFvCmhvSGFhbi1sYW8Gb08tbGFvC2hvSGV1YW4tbGFvCmtobXVHby1sYW8La2htdU55by1sYW8KYVZvd2VsLWxhbwthYVZvd2VsLWxhbwthbVZvd2VsLWxhbwxueW9Wb3dlbC1sYW8KZVZvd2VsLWxhbwthZVZvd2VsLWxhbwpvVm93ZWwtbGFvEmF5TWFpTXVhblZvd2VsLWxhbxFhaU1haU1heVZvd2VsLWxhbxJhbVZvd2VsLWxhby5uYXJyb3cIaG9Oby1sYW8IaG9Nby1sYW8IemVyby1sYW8Hb25lLWxhbwd0d28tbGFvCXRocmVlLWxhbwhmb3VyLWxhbwhmaXZlLWxhbwdzaXgtbGFvCXNldmVuLWxhbwllaWdodC1sYW8IbmluZS1sYW8Ia29MYS1sYW8MZWxsaXBzaXMtbGFvA2tpcA9tYWlLYW5Wb3dlbC1sYW8KaVZvd2VsLWxhbwtpaVZvd2VsLWxhbwtldVZvd2VsLWxhbwxldXVWb3dlbC1sYW8PbWFpS29uVm93ZWwtbGFvCnVWb3dlbC1sYW8LdXVWb3dlbC1sYW8LbG9Wb3dlbC1sYW8JbWFpRWstbGFvCm1haVRoby1sYW8JbWFpVGktbGFvDW1haUNhdGF3YS1sYW8Ja2FyYW4tbGFvDW5pZ2dhaGl0YS1sYW8TbmlnZ2FoaXRhX21haUVrLWxhbxRuaWdnYWhpdGFfbWFpVGhvLWxhbxNuaWdnYWhpdGFfbWFpVGktbGFvF25pZ2dhaGl0YV9tYWlDYXRhd2EtbGFvD21haUVrLWxhby5zbWFsbBBtYWlUaG8tbGFvLnNtYWxsD21haVRpLWxhby5zbWFsbBNtYWlDYXRhd2EtbGFvLnNtYWxsD2thcmFuLWxhby5zbWFsbBZtYWlLYW5Wb3dlbC1sYW8ubmFycm93EWlWb3dlbC1sYW8ubmFycm93EmlpVm93ZWwtbGFvLm5hcnJvdxJldVZvd2VsLWxhby5uYXJyb3cTZXV1Vm93ZWwtbGFvLm5hcnJvdxZtYWlLb25Wb3dlbC1sYW8ubmFycm93EG1haUVrLWxhby5uYXJyb3cRbWFpVGhvLWxhby5uYXJyb3cQbWFpVGktbGFvLm5hcnJvdxRtYWlDYXRhd2EtbGFvLm5hcnJvdxBrYXJhbi1sYW8ubmFycm93FG5pZ2dhaGl0YS1sYW8ubmFycm93Gm5pZ2dhaGl0YV9tYWlFay1sYW8ubmFycm93G25pZ2dhaGl0YV9tYWlUaG8tbGFvLm5hcnJvdxpuaWdnYWhpdGFfbWFpVGktbGFvLm5hcnJvdx5uaWdnYWhpdGFfbWFpQ2F0YXdhLWxhby5uYXJyb3cZbmlnZ2FoaXRhX21haUVrLWxhby5yaWdodBpuaWdnYWhpdGFfbWFpVGhvLWxhby5yaWdodBluaWdnYWhpdGFfbWFpVGktbGFvLnJpZ2h0HW5pZ2dhaGl0YV9tYWlDYXRhd2EtbGFvLnJpZ2h0EHVWb3dlbC1sYW8uc21hbGwRdXVWb3dlbC1sYW8uc21hbGwRbG9Wb3dlbC1sYW8uc21hbGwWbWFpS2FuVm93ZWwtbGFvLmNlbnRlchZtYWlLb25Wb3dlbC1sYW8uY2VudGVyEXVWb3dlbC1sYW8ubmFycm93EnV1Vm93ZWwtbGFvLm5hcnJvdxJsb1Zvd2VsLWxhby5uYXJyb3cTbmlnZ2FoaXRhLWxhby5yaWdodAd1bmkwMEEwB3VuaTIwMEIHdW5pMjAwQwd1bmkyMDBEDGRvdHRlZENpcmNsZQAAAAEAAgAOAAAAAAAAAEIAAgAIAAQAIAABACMAJAABACoALAABADoASAADAE0AUQADAFIAXQABAGgAagABAG0AbgABAAEAAgAAAAwAAAAiAAEACQBAAEEAQgBmAGcAaABrAGwAbQACAAUAOgA/AAAAQwBIAAYATQBlAAwAaQBqACUAbgBuACcAAAABAAAACgAmAEYAAkRGTFQADmxhbyAADgAEAAAAAP//AAIAAAABAAJtYXJrAA5ta21rABgAAAADAAAAAQACAAAAAgADAAQABQAMAP4CIgNiA+oABAAAAAEACAABA2QCLAABA4QADAAgAMAAQgBIAE4AVABsAFoAYABmAGwArgByAJYAeAB+AIQAigCKAJAAlgCcAMAAogCoAK4AtAC6AMAAxgDMANIA2AABAiYAAAABAiUAAAABAUf/SAABAfYAAAABAhgAAAABAjYAAAABAkUAAAABAWkAAAABAigAAAABAiEAAAABAn0AAAABAn4AAAABAo0AAAABAi4AAAABAhoAAAABAgYAAAABAf4AAAABAkIAAAABApkAAAABAhYAAAABAgwAAAABAj4AAAABAiMAAAABAgb/AgABA4AAAAABA6QAAAAEAAAAAQAIAAEC+gAMAAEDPgAiAAIAAwAEACAAAAAjACQAHQAqACwAHwAiANAARgBMAbYAUgBYAF4AZABqAHAAxAB2AHwAggCIAI4AlACaAKAApgCsALIAuAC+AMQAygDiANAA1gDcAOIA6ADuAPQAAQIcAhgAAQIbAhgAAQH2AhgAAQIYAhgAAQIiAhgAAQIsAhgAAQI7AhgAAQIpAhgAAQIyAhgAAQIkAhgAAQF4AhgAAQKIAhgAAQHWAhgAAQKXAhgAAQHlAhgAAQI4AhgAAQFyAhgAAQIUAhgAAQI+AhgAAQH+AhgAAQJMAhgAAQKPAhgAAQIWAhgAAQI0AhgAAQItAhgAAf/MA0UAAQIMAhgAAf7lA1EAAQOKAhgAAQOuAhgABAAAAAEACAABAAwAFgABACwASAACAAEASABMAAAAAgADAAQAIAAAACQAJAAdACsALAAeAAUAAAAWAAAAFgAAABYAAAAWAAAAFgAB/tACGAAgANIAVABCAEgATgBUAFoAYABmAGwAcgB4AH4AhACKAJAAlgCcAKIAqADMAK4AtAC6AMAAxgDMANIA2ADeAOQA6gABATcCGAABALYCGAABAQ4CGAABAT4CGAABAUQCGAABAUACGAABAUoCGAABAVECGAABAYoCGAABAT0CGAABATACGAABAQACGAABAWMCGAABAVUCGAABAWgCGAABAVYCGAABAU4CGAABAPgCGAABAUUCGAABAR8CGAABASsCGAABAYYCGAABAS8CGAABAS0CGAABAV4CGAABAUwCGAABASACGAABAq0CGAAB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AFEAbgACAAIAQABBAAAAQwBIAAIAAQAAAAEACAACABgACQBmAGcAaABNAE4ATwBQAFEAXQACAAEAQABIAAAAAQAAAAEACAACACIADgBSAFMAVABVAFYAVwBmAGcAaABYAFkAWgBbAFwAAgABADoARwAAAAEAAAABAAgAAgAWAAgAawBsAG0AWABZAFoAWwBcAAIAAQBAAEcAAAAGAAAAAQAIAAMAAQBuAAEAIAAAAAEAAAAQAAEAAAABAAgAAQAGAAcAAQABACMABgAAAAMADAAgADQAAwABADwAAQE0AAEBIAABAAAAEgADAAEAKAABAWgAAQGIAAEAAAASAAMAAQAUAAEAIAABAPgAAQAAABIAAQAEABEAEwAVABcAAgABAGIAZQAAAAEAAAABAAgAAgAYAAkAXQBeAF8AYABhAF4AXwBgAGEAAgACAEgATAAAAGIAZQAFAAYAAAABAAgAAwAAAAEA8gABARIAAQAAABQABgAAAAEACAADAAIAVAAUAAEAMAAAAAEAAAAWAAIAAQAlACkAAAABAAAAAQAIAAIACgACAGkAagABAAIAOgA/AAYAAAABAAgAAwABABQAAQBQAAEAPAABAAAAGAACAAYABAAQAAAAEgASAA0AFAAUAA4AFgAWAA8AGAAgABAAKwAsABkAAQABACIAAQAAAAEACAABAAYAGQACAAEASQBMAAAABgAAAAEACAADAAEAEgABADYAAAABAAAAGgACAAMAOgA/AAAAUwBWAAYAaQBqAAoAAQAAAAEACAABAAYAJgABAAEASAAGAAAAAQAIAAMAAQASAAEAKgAAAAEAAAAcAAEAAwBCAGgAbQABAAAAAQAIAAEABgAmAAEAAQBCAAA=';
var callAddFont = function () {
this.addFileToVFS('NotoSansLao-Bold-bold.ttf', font);
this.addFont('NotoSansLao-Bold-bold.ttf', 'NotoSansLao-Bold', 'bold');
};
jsPDF.API.events.push(['addFonts', callAddFont])
