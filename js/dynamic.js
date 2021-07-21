document.addEventListener('DOMContentLoaded', function () {

    //Secciones
    const FORM = document.getElementById('FORM');
    const SSA = document.getElementById('SSA');
    const EXTINF = document.getElementById('EXTINF');
    const repTot = document.getElementById('repTot');
    const EVIDENCE = document.getElementById('EVIDENCE');
    const REPORTDIV = document.getElementById('REPORTDIV');
    const EXTINFlab = document.getElementById('EXTINFlab');

    //Select
    const actType = document.getElementById('actType');
    const resOfAct = document.getElementById('resOfAct');

    //General TXT
    const obs = document.getElementById('obs');
    const actReqPos = document.getElementById('actReqPos');
    const evidence = document.getElementById('evidence');
    const TTDREF = document.getElementById('TTDREF');
    const actIX = document.getElementById('actIX');
    const reportTXT = document.getElementById('reportTXT');


    //Check
    const extInf = document.getElementById('extInf');
    const Check1SSA = document.getElementById('Check1SSA');
    const Check2TTD = document.getElementById('Check2TTD');
    const Check3E2E = document.getElementById('Check3E2E');
    const Check4NR = document.getElementById('Check4NR');
    const Check4IX = document.getElementById('Check5IX');
    const Check5DAL = document.getElementById('Check6DAL');
    const spaCheck = document.getElementById('spaCheck');

    let Check1SSARep;
    let Check2TTDRep;
    let Check3E2ERep;
    let Check4IXRep;
    let Check4NRRep;
    let Check5DALRep;

    var value = 7;

    //ACCIONES INICIO
    FORM.style.display = "block";
    REPORTDIV.style.display = "none";
    reportTXT.style.display = "none";
    showCoordinator();

    //BTN
    const report = document.getElementById('report');
    const modBtn = document.getElementById('modify');
    const copyBtn = document.getElementById('copyBtn');

    //SELECT EVENT LISTENER
    resOfAct.addEventListener('change', (event) => {
        showCoordinator();
    });
    actType.addEventListener('change', (event) => {
        showCoordinator();
    });

    extInf.addEventListener('change', function () {
        if (extInf.checked == true) {
            EXTINF.style.display = "block";
        }
        else {
            EXTINF.style.display = "none";
        }
    });

    //SUBMIT REPORT
    report.addEventListener("click", function () {
        validation();


    });

    spaCheck.addEventListener('change', (event) => {

        validationCoordination(1);

    });

    modBtn.addEventListener("click", function () {
        checkNA();
        FORM.style.display = "block";
        report.style.display = "block";
        REPORTDIV.style.display = "none";
    });

    copyBtn.addEventListener("click", function () {
        if (spaCheck.checked) {
            reportTXT.value =
                "[ " + resOfAct.value + " ] ACTIVIDAD: " + actType.value + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +
                "- OBSERVACIONES " + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +
                "- Resultado: " + resOfAct.value + String.fromCharCode(10) +
                "- Observaciones: " + obs.value + String.fromCharCode(10) +
                "- Segundo intento: " + Check1SSARep + String.fromCharCode(10) +
                "- Acciones necesarias post-ventana: " + actReqPos.value + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +
                " - PRUEBAS" + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +
                "- Evidencia: " + evidence.value + String.fromCharCode(10) +
                "- TT Duna: " + Check2TTDRep + String.fromCharCode(10) +
                "- Referencia TT Duna: " + TTDREF.value + String.fromCharCode(10) +
                "- Cambio Infoblox: " + Check4IXRep + String.fromCharCode(10) +
                "- Acciones realizads en Infoblox: " + actIX.value + String.fromCharCode(10) +
                "- End To End (E2E): " + Check3E2ERep + String.fromCharCode(10) +
                "- Delivery Aceptance Letter(DAL): " + Check5DALRep + String.fromCharCode(10) +
                "- Netrounds: " + Check4NRRep; String.fromCharCode(10);
        }
        else {
            reportTXT.value = "[ " + resOfAct.value + " ] TYPE OF ACTIVITY: " + actType.value + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +
                "- G E N E R A L   -  O B S E R V A T I O N S" + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +

                "- Result: " + resOfAct.value + String.fromCharCode(10) +
                "- Observations: " + obs.value + String.fromCharCode(10) +
                "- Schedule a second attempt: " + Check1SSARep + String.fromCharCode(10) +
                "- Actions requiered post activity: " + actReqPos.value + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +
                " - T E C H N I C A L  -   O B S E R V A T I O N S" + String.fromCharCode(10) +
                "--------------------------------------------------------------------------------" + String.fromCharCode(10) +
                "- Evidence: " + evidence.value + String.fromCharCode(10) +
                "- TT Duna: " + Check2TTDRep + String.fromCharCode(10) +
                "- TT Duna Reference: " + TTDREF.value + String.fromCharCode(10) +
                "- Infoblox modification: " + Check4IXRep + String.fromCharCode(10) +
                "- Actions perfomed on Infoblox: " + actIX.value + String.fromCharCode(10) +
                "- End To End (E2E): " + Check3E2ERep + String.fromCharCode(10) +
                "- Delivery Aceptance Letter(DAL): " + Check5DALRep + String.fromCharCode(10) +
                "- Netrounds: " + Check4NRRep + String.fromCharCode(10);
        }
        reportTXT.style.display = "block";
        reportTXT.select();
        reportTXT.setSelectionRange(0, 99999999999);
        document.execCommand("copy");
        reportTXT.style.display = "none";


    });
    //SHOW COORDINATOR

    function showCoordinator() {

        if (actType.value == "BAU" && (resOfAct.value == "SUCCESS")) {
            value = 1;
        }
        if (actType.value == "BAU" && (resOfAct.value == "SUCCESSFUL WITH ISSUES" || resOfAct.value == "UNSUCCESS")) {
            value = 2;
        }
        if (actType.value == "BAU" && (resOfAct.value == "BACKED OUT")) {
            value = 3;
        }
        if (actType.value == "PROVISION" && (resOfAct.value == "SUCCESS")) {
            value = 4;
        }
        if (actType.value == "PROVISION" && (resOfAct.value == "SUCCESSFUL WITH ISSUES" || resOfAct.value == "UNSUCCESS")) {
            value = 5;
        }
        else if (actType.value == "PROVISION" && (resOfAct.value == "BACKED OUT")) {
            value = 6;
        }

        switch (value) {

            case 1:
                repTot.style.display = "block";
                SSA.style.display = "none";
                EXTINFlab.style.display = "block";
                EXTINF.style.display = "none";
                EVIDENCE.style.display = "block";
                reportTXT.style.display = "none";
                break;
            case 2:
                repTot.style.display = "block";
                SSA.style.display = "block";
                EXTINFlab.style.display = "block";
                EXTINF.style.display = "none";
                EVIDENCE.style.display = "block";
                reportTXT.style.display = "none";
                break;
            case 3:
                repTot.style.display = "block";
                SSA.style.display = "block";
                EXTINFlab.style.display = "none";
                EXTINF.style.display = "none";
                EVIDENCE.style.display = "none";
                reportTXT.style.display = "none";
                break;
            case 4:
                repTot.style.display = "block";
                SSA.style.display = "none";
                EXTINFlab.style.display = "none";
                EXTINF.style.display = "block";
                EVIDENCE.style.display = "block";
                reportTXT.style.display = "none";
                break;
            case 5:
                repTot.style.display = "block";
                SSA.style.display = "block";
                EXTINFlab.style.display = "none";
                EXTINF.style.display = "block";
                EVIDENCE.style.display = "block";
                reportTXT.style.display = "none";
                break;

            case 6:
                repTot.style.display = "block";
                SSA.style.display = "block";
                EXTINFlab.style.display = "block";
                EXTINF.style.display = "none";
                EVIDENCE.style.display = "none";
                reportTXT.style.display = "none";
                break;
            case 7:
                repTot.style.display = "none";
                reportTXT.style.display = "none";
                break;
        }
    }

    function answerCoordinator() {

        if (spaCheck.checked) {
            if (Check1SSA.checked) {
                Check1SSARep = "[ SI ]";
            } else {
                Check1SSARep = "[ NO ]";
            }
            if (Check2TTD.checked) {
                Check2TTDRep = "[ SI ]";
            } else {
                Check2TTDRep = "[ N/A ]";
            }
            if (Check3E2E.checked) {
                Check3E2ERep = "[ SI ]";
            } else {
                Check3E2ERep = "[ N/A ]";
            }
            if (Check4IX.checked) {
                Check4IXRep = "[ SI ]";
            } else {
                Check4IXRep = "[ N/A ]";
            }
            if (Check4NR.checked) {
                Check4NRRep = "[ SI ]";
            } else {
                Check4NRRep = "[ N/A ]";
            }
            if (Check5DAL.checked) {
                Check5DALRep = "[ SI ]";
            } else {
                Check5DALRep = "[ N/A ]";
            }
            if (obs.value == "") {
                obs.value = "[ N/A ]";
            }
            if (actReqPos.value == "") {
                actReqPos.value = "[ N/A ]";
            }
            if (evidence.value == "") {
                evidence.value = "[ N/A ]";
            }
            if (TTDREF.value == "") {
                TTDREF.value = "[ N/A ]";
            }
            if (actIX.value == "") {
                actIX.value = "[ N/A ]";
            }
        } else {
            if (Check1SSA.checked) {
                Check1SSARep = "[ YES ]";
            } else {
                Check1SSARep = "[ NO ]";
            }
            if (Check2TTD.checked) {
                Check2TTDRep = "[ YES ]";
            } else {
                Check2TTDRep = "[ N/A ]";
            }
            if (Check3E2E.checked) {
                Check3E2ERep = "[ YES ]";
            } else {
                Check3E2ERep = "[ N/A ]";
            }
            if (Check4IX.checked) {
                Check4IXRep = "[ YES ]";
            } else {
                Check4IXRep = "[ N/A ]";
            }
            if (Check4NR.checked) {
                Check4NRRep = "[ YES ]";
            } else {
                Check4NRRep = "[ N/A ]";
            }
            if (Check5DAL.checked) {
                Check5DALRep = "[ YES ]";
            } else {
                Check5DALRep = "[ N/A ]";
            }
            if (obs.value == "") {
                obs.value = "[ N/A ]";
            }
            if (actReqPos.value == "") {
                actReqPos.value = "[ N/A ]";
            }
            if (evidence.value == "") {
                evidence.value = "[ N/A ]";
            }
            if (TTDREF.value == "") {
                TTDREF.value = "[ N/A ]";
            }
            if (actIX.value == "") {
                actIX.value = "[ N/A ]";
            }
        }
    }
    function checkNA() {
        if (obs.value == "[ N/A ]") {
            obs.value = "";
        }
        if (actReqPos.value == "[ N/A ]") {
            actReqPos.value = "";
        }
        if (evidence.value == "[ N/A ]") {
            evidence.value = "";
        }
        if (TTDREF.value == "[ N/A ]") {
            TTDREF.value = "";
        }
        if (actIX.value == "[ N/A ]") {
            actIX.value = "";
        }
    }
    function divInner() {

        if (spaCheck.checked) {
            document.getElementById("REPORTBOX").innerHTML =
                "[ " + resOfAct.value + " ] ACTIVIDAD: " + actType.value +
                
                "<br><br>- OBSERVACIONES - " +
                
                "<br>- Resultado: " + resOfAct.value +
                "<br>- Observaciones: " + obs.value +
                "<br>- Segundo intento: " + Check1SSARep +
                "<br>- Acciones necesarias post-ventana: " + actReqPos.value +
                
                "<br><br>- PRUEBAS -" +
                
                "<br>- Evidencia: " + evidence.value +
                "<br>- TT Duna: " + Check2TTDRep +
                "<br>- Referencia TT Duna: " + TTDREF.value +
                "<br>- Cambio Infoblox: " + Check4IXRep +
                "<br>- Acciones realizads en Infoblox: " + actIX.value +
                "<br>- End To End (E2E): " + Check3E2ERep +
                "<br>- Delivery Aceptance Letter(DAL): " + Check5DALRep +
                "<br>- Netrounds: " + Check4NRRep;
        }
        else {
            document.getElementById("REPORTBOX").innerHTML =
                "[ " + resOfAct.value + "  ] TYPE OF ACTIVITY: " + actType.value +
               
                "<br><br> - G E N E R A L   -  O B S E R V A T I O N S -" +
               
                "<br>- Result: " + resOfAct.value +
                "<br>- Observations: " + obs.value +
                "<br>- Schedule a second attempt: " + Check1SSARep +
                "<br>- Actions requiered post activity: " + actReqPos.value +
               
                "<br><br> - T E C H N I C A L  -   O B S E R V A T I O N S -" +
               
                "<br>- Evidence: " + evidence.value +
                "<br>- TT Duna: " + Check2TTDRep +
                "<br>- TT Duna Reference: " + TTDREF.value +
                "<br>- Infoblox modification: " + Check4IXRep +
                "<br>- Actions perfomed on Infoblox: " + actIX.value +
                "<br>- End To End (E2E): " + Check3E2ERep +
                "<br>- Delivery Aceptance Letter(DAL): " + Check5DALRep +
                "<br>- Netrounds: " + Check4NRRep;
        }

    }

    function validation() {
        if (resOfAct.value == "- Select an option" || actType.value == "- Select an option") {
            alert("ERROR: Select an option for TYPE OF ACTIVITY or RESULT");
            validationCoordination(2);
        }
        else {
            switch (value) {
                // CASOS BAU, SI EL EXTRA INFORMATION ES CHECKED, REVISAR SI DOCUMENTACIÓN, DUNA, IF
                case 1:
                    if (obs.value == "" || evidence.value == "") {
                        alert("ERROR: ( Observations or Evindence ) can not be EMPTY");
                        validationCoordination(2);
                    }
                    else if (extInf.checked) {
                        if (Check2TTD.checked && TTDREF.value == "") {
                            alert("ERROR: Please add the TT Duna Reference");
                            validationCoordination(2);
                        }
                        else if (Check4IX.checked && actIX.value == "") {
                            alert("ERROR: Please add the NSLOOKUP test");
                            validationCoordination(2);
                        } else {
                            if (Check5DAL.checked || Check3E2E.checked || Check4NR.checked) {
                                validationCoordination(1);
                            }
                            else {
                                if (confirm("ERROR: Documentation (DAL | E2E | Netrounds ) not selected, press cancel to modify it")) {
                                    validationCoordination(1);
                                }
                                else {
                                    validationCoordination(2);
                                }
                            }
                        }
                    }
                    else {
                        validationCoordination(1);
                    }



                    break;

                case 2:
                    if (obs.value == "" || evidence.value == "" || actReqPos.value == "") {
                        alert("ERROR: ( Observations, Actions required post activity or Evindence ) can not be EMPTY");
                        validationCoordination(2);
                    }
                    else if (extInf.checked) {
                        if (Check2TTD.checked && TTDREF.value == "") {
                            alert("ERROR: Please add the TT Duna Reference");
                            validationCoordination(2);
                        }
                        else if (Check4IX.checked && actIX.value == "") {
                            alert("ERROR: Please add the NSLOOKUP test");
                            validationCoordination(2);
                        } else {
                            if (Check5DAL.checked || Check3E2E.checked || Check4NR.checked) {
                                validationCoordination(1);
                            }
                            else {
                                if (confirm("ERROR: Documentation (DAL | E2E | Netrounds ) not selected, press cancel to modify it")) {
                                    if (Check1SSA.checked) {
                                        validationCoordination(1);
                                    }
                                    else {
                                        if (confirm("Are you sure that to Schedule a second attempt (NEW CRQ) is not needed?")) {
                                            validationCoordination(1);
                                        } else {
                                            validationCoordination(2);
                                        }
                                    }
                                }
                                else {
                                    validationCoordination(2);
                                }
                            }
                        }
                    }
                    else {
                        if (confirm("Are you sure that to Schedule a second attempt (NEW CRQ) is not needed?")) {
                            validationCoordination(1);
                        } else {
                            validationCoordination(2);
                        }
                    }
                    break;
                case 3:
                    if (obs.value == "" || actReqPos.value == "") {
                        alert("ERROR: ( Observations, Actions required post activity ) can not be EMPTY");
                        validationCoordination(2);
                    } else {
                        if (Check1SSA.checked) {
                            validationCoordination(1);
                        }
                        else {
                            if (confirm("Are you sure that to Schedule a second attempt (NEW CRQ) is not needed?")) {
                                validationCoordination(1);
                            } else {
                                validationCoordination(2);
                            }
                        }
                    }
                    break;
                case 4:
                    if (obs.value == "" || evidence.value == "") {
                        alert("ERROR: ( Observations or Evindence ) can not be EMPTY");
                        validationCoordination(2);
                    }
                    else if (Check2TTD.checked && TTDREF.value == "") {
                        alert("ERROR: Please add the TT Duna Reference");
                        validationCoordination(2);
                    }
                    else if (Check4IX.checked && actIX.value == "") {
                        alert("ERROR: Please add the NSLOOKUP test");
                        validationCoordination(2);
                    } else {
                        if (Check5DAL.checked || Check3E2E.checked || Check4NR.checked) {
                            validationCoordination(1);
                        }
                        else {
                            if (confirm("ERROR: Documentation (DAL | E2E | Netrounds ) not selected, press cancel to modify it")) {
                                if (Check1SSA.checked) {
                                    validationCoordination(1);
                                }
                                else {
                                    validationCoordination(2);
                                }
                            }
                            else {
                                validationCoordination(2);
                            }
                        }
                    }
                    break;
                case 5:
                    if (obs.value == "" || evidence.value == "" || actReqPos.value == "") {
                        alert("ERROR: ( Observations, Actions required post activity or Evindence ) can not be EMPTY");
                        validationCoordination(2);
                    }
                    else if (Check2TTD.checked && TTDREF.value == "") {
                        alert("ERROR: Please add the TT Duna Reference");
                        validationCoordination(2);
                    }
                    else if (Check4IX.checked && actIX.value == "") {
                        alert("ERROR: Please add the NSLOOKUP test");
                        validationCoordination(2);
                    } else {
                        if (Check5DAL.checked || Check3E2E.checked || Check4NR.checked) {
                            validationCoordination(1);
                        }
                        else {
                            if (confirm("ERROR: Documentation (DAL | E2E | Netrounds ) not selected, press cancel to modify it")) {
                                if (Check1SSA.checked) {
                                    validationCoordination(1);
                                }
                                else {
                                    if (confirm("Are you sure that to Schedule a second attempt (NEW CRQ) is not needed?")) {
                                        validationCoordination(1);
                                    } else {
                                        validationCoordination(2);
                                    }
                                }
                            }
                            else {
                                validationCoordination(2);
                            }
                        }
                    }
                    break;
                case 6:
                    if (obs.value == "" || actReqPos.value == "") {
                        alert("ERROR: ( Observations or Evindence) can not be EMPTY");
                        validationCoordination(2);
                    } else {
                        if (Check5DAL.checked || Check2TTD.checked || Check3E2E.checked || Check4IX.checked || Check4NR.checked) {
                            validationCoordination(1);
                        }
                        else {
                            if (confirm("Documentation (DAL | E2E | Netrounds ) not selected, press cancel to modify it")) {
                                validationCoordination(1);
                            } else {
                                validationCoordination(2);
                            }

                        }
                    }
                    break;
            }
        }
    }

    function validationCoordination(vc) {

        switch (vc) {
            case 1:
                FORM.style.display = "none";
                report.style.display = "none";
                answerCoordinator();
                divInner();
                REPORTDIV.style.display = "block";
                modBtn.style.display = "block";
                break;
            case 2:
                //alert("NO");
                FORM.style.display = "block";
                break;
        }
    }
})



