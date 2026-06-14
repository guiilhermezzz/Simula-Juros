import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockAuth } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { TrendingUp, User, Mail, Calendar, Activity, LogOut, Edit, Key } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Perfil() {
  const navigate = useNavigate();
  const user = mockAuth.getUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await mockAuth.signOut();
    mockAuth.setUser(null);
    navigate("/");
  };

  const createdDate = new Date(user.created_at);

  const [currentUser, setCurrentUser] = useState(user);
  const [profileName, setProfileName] = useState(user.user_metadata?.name || "");
  const [nameError, setNameError] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleNameUpdate = async () => {
    setNameError("");
    setNameSuccess("");

    if (!profileName.trim()) {
      setNameError("O nome não pode ficar em branco.");
      return;
    }

    setIsUpdatingName(true);
    const { data, error } = await mockAuth.updateName(profileName.trim());
    setIsUpdatingName(false);

    if (error) {
      setNameError(error.message || "Erro ao atualizar o nome.");
      return;
    }

    if (data?.user) {
      setCurrentUser(data.user);
      setNameSuccess("Nome atualizado com sucesso.");
    }
  };

  const handlePasswordUpdate = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("A nova senha e a confirmação não coincidem.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsUpdatingPassword(true);

    const { error } = await mockAuth.changePassword(currentPassword, newPassword);

    setIsUpdatingPassword(false);

    if (error) {
      setPasswordError(error.message || "Erro ao alterar a senha.");
      return;
    }

    setPasswordSuccess("Senha alterada com sucesso.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-serif text-xl md:text-2xl font-bold text-primary">
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8" />
            <span className="hidden sm:inline">Simula Juros</span>
          </Link>

          {/* theme toggle removed */}
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Avatar e informações principais */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                    {(
                      currentUser.user_metadata?.name ||
                      currentUser.email?.split('@')[0] ||
                      'U'
                    ).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-2">
                  <h1 className="text-3xl font-bold font-serif">
                    {currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || "Usuário"}
                  </h1>
                  <p className="text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" />
                  Nome
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl">{currentUser.user_metadata?.name || "Não informado"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl break-all">{currentUser.email}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  Membro desde
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl">
                  {format(createdDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </CardContent>
            </Card>

          </div>

          {/* Ações */}
          <Card>
            <CardHeader>
              <CardTitle>Ações da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="lg"
                onClick={() => setShowEditProfile((prev) => !prev)}
              >
                <Edit className="mr-2 h-5 w-5" />
                {showEditProfile ? "Fechar Alterar Perfil" : "Alterar Perfil"}
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-start" 
                size="lg"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sair da Conta
              </Button>
            </CardContent>
          </Card>

          {showEditProfile ? (
            <Card>
              <CardHeader>
                <CardTitle>Editar Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Nome</Label>
                    <Input
                      id="profile-name"
                      type="text"
                      value={profileName}
                      onChange={(event) => setProfileName(event.target.value)}
                    />
                  </div>

                  {nameError ? (
                    <p className="text-sm text-destructive">{nameError}</p>
                  ) : null}

                  {nameSuccess ? (
                    <p className="text-sm text-emerald-600">{nameSuccess}</p>
                  ) : null}

                  <Button
                    className="w-full"
                    onClick={handleNameUpdate}
                    disabled={isUpdatingName}
                  >
                    {isUpdatingName ? "Atualizando..." : "Atualizar Nome"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                  </div>

                  {passwordError ? (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  ) : null}

                  {passwordSuccess ? (
                    <p className="text-sm text-emerald-600">{passwordSuccess}</p>
                  ) : null}

                  <Button
                    className="w-full"
                    onClick={handlePasswordUpdate}
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? "Atualizando..." : "Atualizar Senha"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* Estatísticas */}
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle>Resumo da Atividade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  {Math.ceil((new Date().getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Dias de uso</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
